var express = require('express');
//var app = require('express')();
const mongoose = require('mongoose')
const moment = require('moment')
var bodyParser = require('body-parser')

const http = require('http')
const loca0 = require('../models/dbsensor')
const loca2 = require('../models/loca2');
const test1 = require('../models/test1');
const { Console } = require('console');
const route = express.Router();
route.use(bodyParser.urlencoded({
    extended: true
  }))
  let m1 ="";
route.get('/', function(req, res) {

    ///res.render("index")
    // loca0.find({},function(err,loca0){
    //    res.render('index',{
    //      sensorlist:loca0
    //     })   
    //   }).sort({_id:-1}).limit(1);
    loca0.find().then(loca0 => {
        loca2.find().then(loca2 => {

            res.render('index', {
                sensorlist: loca0,
                chart1: loca0,
                sensorlist1: loca2,
            });
        })

    });


});
route.get('/intro', function(req, res) {
    //loca0.find({}).then(loca0 => {
    //    res.render('intro',{loca0})  })
    //res.render('intro')
    loca0.find(function(err, loca0) {

        res.render('intro', {
            chart1: loca0
        })
    }).sort({ _id: -1 }).limit(1);

})
route.get('/homepage', function(req, res) {
    res.json('homepage')
})
route.get('/appdata', function(req, res) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var times = new Date();
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const year = time.getFullYear();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'pm' : 'am'
    const day1 = days[day] + ', ' + date + ' ' + months[month];
    const day2 = date + "-" + month + "-" + year;

    //console.log(month)
    loca0.find({
        flashws:30
    }).exec().then(loca0 => {
        loca2.find({
            flashw1: {
                $gte: 30
            }

        }).then(loca2 => {

            res.json({
                loca0,
                loca2,

            });
            console.log(loca0)

        })

    });

})
route.get('/tiltleapp', function(req, res) {

    test1.find().then(test1 => {

            res.json({
                test1,

            });


        })
        //.sort({ _id: -1 }).limit(1)

})
route.post('/salary-sheet',function(req,res){
    var m1 = req.body.selectpicker
    console.log( m1)
    loca2.find({
        diachi1: m1
    }).then(loca2 => {


            res.json({
                loca2,
            });

       
          //  console.log(loca2)

    });


    })


var interval = setInterval(function() {
    //sensor1/0.3/25/song sai gon/106.721/10.795
    //sensor1/0.1/15/song tien/106.343/10.336
    //sensor1/0.2/15/song hau/ 106.216/9.516
    route.get('/sensor1/:Per/:spe/:address/:lon/:la', function(req, res) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const time = new Date();
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const year = time.getFullYear();
        const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
        const minutes = time.getMinutes();
        const ampm = hour >= 12 ? 'pm' : 'am'
        const day1 = days[day] + ', ' + date + ' ' + months[month];
        const day3 = date + "-" + month + "-" + year;

        var p = req.params.Per;

        var s = req.params.spe;
        var ad = req.params.address;
        var lon = req.params.lon;
        var la = req.params.la;



        //res.render(__dirname + "/views/index.ejs", {t:t});

        //res.send('hi'+t+h)

        test1.create({
            Percentsals1: p,
            flashws1: s,
            dubaos1: "2 ngay",
            times1: (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ampm,
            diachis1: ad,
            longitude: lon,
            latidude: la,
            hours1: days[day] + ', ' + date + ' ' + months[month],
            fullday: day3
        })


    })
}, 60000)
var interval = setInterval(function() {

    route.get('/sensor/:temp/:hmdt/:point1/:point2/', function(req, res) {
        // /sensor/:1/:2/:3/:4/
        var t = req.params.temp;

        var h = req.params.hmdt;

        var a1 = req.params.point1;

        var b1 = req.params.point2;
        //res.render(__dirname + "/views/index.ejs", {t:t});
        console.log(t)
        console.log(h)
        console.log(a1)
        console.log(b1)
            //res.send('hi'+t+h)
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var times = new Date();
        const time = new Date();
        const year = time.getFullYear();

        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
        const minutes = time.getMinutes();
        const ampm = hour >= 12 ? 'pm' : 'am'

       // console.log((hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ampm)

        //console.log(days[day] + ', ' + date + ' ' + months[month])
        const day2 = date + "-" + month + "-" + year;

        console.log(day)
        console.log(month)
        const brain = require('brain.js');
        const fs = require('fs');
        
        // Khởi tạo mạng neural
        const net = new brain.NeuralNetwork();
        
        // Đọc nội dung tệp training_data.json
        fs.readFile('./training_data.json', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
        
          // Chuyển nội dung tệp thành mảng JSON
          const trainingData = JSON.parse(data);
        
          // Train mạng neural
          net.train(trainingData, {
            errorThresh: 0.005,  // Chỉ số sai số cho phép
            iterations: 20000,   // Số vòng lặp tối đa cho training
            log: true,           // Bật log để theo dõi quá trình training
            logPeriod: 100       // Số vòng lặp giữa các lần log
          });
        
          // Sử dụng mạng neural để dự đoán mực nước sau khi có mưa
          const output = net.run({ mucnuoc: 10, luongmua: 10 });
          console.log(`Water level after rain:`+ stringify(output))})
        
        loca0.create({
            Percentsals: t,
            flashws: h,
            dubaos: "2 ngay",
            times: (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ampm,
            diachis: "Phú Phong",
            hours: days[day] + ', ' + date + ' ' + months[month],
            test: day2

        });

        loca2.create({
            Percentsal1: a1,
            flashw1: b1,
            dubao1: "2 ngay",
            time1: (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ampm,
            diachi1: "Tien Giang",
            hour2: days[day] + ', ' + date + ' ' + months[month]
        })



    })
}, 1000)

module.exports = route
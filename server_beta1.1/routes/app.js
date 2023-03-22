var express = require('express');
//var app = require('express')();
const mongoose = require('mongoose')
const moment = require('moment')
const bodyParser = require('body-parser');


const Expo = require('expo-server-sdk').Expo;
const expo = new Expo();
const http = require('http')

const loca0 = require('../models/dbsensor')
const loca2 = require('../models/loca2');
const test1 = require('../models/test1');

const route = express.Router();
const messages = [
  
];

route.use(bodyParser.urlencoded({
    extended: true
  }))

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
//train/1/2/3/
route.get('/train/:temp/:hmdt/:point1/', (req, res) => {
  const mua = Number(req.params.temp);
  const chay = Number(req.params.hmdt);
  const doman = Number(req.params.point1);
   // const data1 = require('./data.json')

    //const network = new brain.recurrent.LSTM();
    //network.train(data1, {
    //    iterations: 2000
    //})
   // const output = network.run([mua, chay,doman])

/**
 * Printing the output on the console
 */

//if (output > 0.5) {
 //   console.log('Độ mặn sẽ tăng');
 // } else {
 //   console.log('Độ mặn sẽ giảm');
 //s }

 const tf = require('@tensorflow/tfjs');
const data = require('./data.json');

// Tạo mảng dữ liệu đầu vào và đầu ra
const inputData = data.map(item => item.input);
const outputData = data.map(item => item.output);

// Tạo mô hình
const model = tf.sequential();
model.add(tf.layers.dense({inputShape: [3], units: 4, activation: 'sigmoid'}));
model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

// Biên dịch mô hình
model.compile({loss: 'binaryCrossentropy', optimizer: 'adam'});

// Huấn luyện mô hình
model.fit(tf.tensor(inputData), tf.tensor(outputData), {epochs: 100})
  .then(() => {
    // Dự báo độ mặn của nước mới
    const newData = [mua, chay, doman];
    const prediction = model.predict(tf.tensor([newData]));
    const predictionValue = prediction.dataSync()[0];
    if (predictionValue > 0.5) {
      console.log('Mặn');
      async function getTokenAndSendMessage() {
        // Thông tin của thiết bị nhận thông báo
        const somePushTokens = ['ExponentPushToken[p3hnvCPI26TWpzQ1aMpJxY]'];
      
        // Tạo các hàm async để lấy thông tin của thiết bị
        const chunks = expo.chunkPushNotifications(somePushTokens.map(token => ({
          to: token,
          sound: 'default',
          body: 'Cảnh báo độ mặn tăng cao'+' '+'độ mặn'+doman,
          data: { withSome: 'data' },
        })));
      
        const tickets = [];
        for (const chunk of chunks) {
          try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      
        console.log(tickets);
      }
      
      getTokenAndSendMessage();
      const chunks = expo.chunkPushNotifications(messages);
      (async () => {
        for (const chunk of chunks) {
          try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      })();
    } else {
      console.log('Không mặn');
    }  });

  });
 
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

      //  const data1 = require('./data.json')

       // const network = new brain.recurrent.LSTM();
      //  network.train(data1, {
          //  iterations: 2000
        })
       // const output = network.run([p, s,s])
    
    /**
     * Printing the output on the console
     */
    
    //if (output > 0.5) {
     //   console.log('Độ mặn sẽ tăng');
     // } else {
     //   console.log('Độ mặn sẽ giảm');
   //  // }
   // })
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
      //const brain=require('brainjs')
       // const data1 = require('./data.json')

       // const network = new brain.recurrent.LSTM();
       // network.train(data1, {
       //     iterations: 2000
       // })
       // const output = network.run([t, h,a1])
    
    /**
     * Printing the output on the console
     */
    
    //if (output > 0.5) {
    //    console.log('Độ mặn sẽ tăng');
    //  } else {
    //    console.log('Độ mặn sẽ giảm');
    //  }
        
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
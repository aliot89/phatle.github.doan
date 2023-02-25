const PORT = 8000;
const http = require('http')
    //Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server
var express = require('express');
var app = require('express')();
var cors = require('cors')


//var server = require('http').Server(app);
//var io = require('socket.io')(server);
const mongoose = require('mongoose')
app.use(cors({
    origin: 'http://localhost:8000'
  }));

const Schema = mongoose.Schema;
app.listen(PORT);
var path = require('path')
    //mongoose.connect(URL, { useNewUrlParser: true })
    //mongodb://localhost:27017/dbsensor
const url = 'mongodb://localhost:27017/dbsensor';
const URL = 'mongodb+srv://dbsensor:!36912@dbsensor1.4efbswz.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async() => {
    try {
        await mongoose.connect(
            URL, { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()


app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const routess = require('./routes/app')

app.use('/', routess)

var ip = require('ip');
const { stringify } = require('querystring');

console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams) //kiem tra ket noi database
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
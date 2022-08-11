const db = require('./firebase.js').db
const get = require('firebase/database').get
const ref = require('firebase/database').ref
const child = require('firebase/database').child
const updateInfo = require('./GetFlightInfo.js')

var express = require('express')
// var cors = require('cors')
const app = express()
// app.use(cors)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
  
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
  };
  app.use(allowCrossDomain);
  
//   app.options('*', cors());
app.listen(3001, () => {console.log("Server started")})

const dbRef = ref(db)
let d = new Date()
let day = d.getDate()
day = day <= 9 ? '0' + day : day;
let month = d.getMonth()
month = month <= 9 ? '0' + month : month;
let date = d.getFullYear().toString() + month.toString() + day.toString()

app.get("/api/getinfo", (req, res) => {
    get(child(dbRef, date)).then((snapshot) => {
        if (snapshot.exists()){
            res.json(snapshot.val())
        }
        else{
            console.log("No data available")
        }
    }).catch((error) => {
        console.error(error)
    })
})

app.get("/api/updateinfo", (req, res) => {
    get(child(dbRef, date)).then((snapshot) => {
        if (snapshot.exists()){
            res.send('No Need to Update')
        }
        else{
            console.log("Updating Info")
            updateInfo().then((response) => {
                res.send('Updated')
            })
        }
    })
})


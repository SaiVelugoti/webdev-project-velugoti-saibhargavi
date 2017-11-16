/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: "http://api.eventful.com"
}

app.options('*', cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// if (req.method === 'OPTIONS') {
//   console.log('!OPTIONS');
//   var headers = {};
//   // IE8 does not allow domains to be specified, just the *
//   // headers["Access-Control-Allow-Origin"] = req.headers.origin;
//   headers["Access-Control-Allow-Origin"] = "*";
//   headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
//   headers["Access-Control-Allow-Credentials"] = false;
//   headers["Access-Control-Max-Age"] = '86400'; // 24 hours
//   headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
//   res.writeHead(200, headers);
//   res.end();

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // Asgn - 6
  // res.header("Access-Control-Allow-Credentials", "true);
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

require("./project/app")(app);
server.listen(port);

var serverSide = require("./server/test-mongodb/app");
serverSide(app);


app.get('/', function (req, res, next) {
  res.send();
});

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});


server.listen(port, () => console.log('Running'));

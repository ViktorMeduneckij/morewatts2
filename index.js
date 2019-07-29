var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('./db/mongoose_con.js');
var sslRedirect = require('heroku-ssl-redirect');
const path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// enable ssl redirect
app.use(sslRedirect());

//Routes
require('./routes/event.js')(app);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//Additional libraries.
app.get('/airpickerjs', function(req, res) {
  res.sendFile(__dirname + '/node_modules/air-datepicker/dist/js/datepicker.min.js');
});
app.get('/airpickerlanguagejs', function(req, res) {
  res.sendFile(__dirname + '/node_modules/air-datepicker/dist/js/i18n/datepicker.en.js');
});
app.get('/airpickercss', function(req, res) {
  res.sendFile(__dirname + '/node_modules/air-datepicker/dist/css/datepicker.min.css');
});

if (process.env.NODE_ENV === "production") {
  console.log('IM ON PROD SON');
  app.use(express.static("client/build"));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

else {
  app.use(express.static(path.join(__dirname, '/client/public')));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Vaziuojam ant ${PORT}`)
})
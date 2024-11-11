// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function getDate(date) {
  if(!date) {
    date = new Date();
  } else {
      if (isInteger(date)) {
        date = parseInt(date);
      } else {
        date = Date.parse(date);
        if (isNaN(date)) {
          return null;
        }
      }
      
    date = new Date(date);
  }
  strDate = formatDateString(date);
  return {"utc": strDate, "unix": date.getTime()};
}

function isInteger(value) {
  return /^\d+$/.test(value);
}

function formatDateString(date) {
  date.toLocaleString('en-UK', { timeZone: 'Europe/London' });
  var strDate = date.toString().replace("(Coordinated Universal Time)", "").replace("+0000", "").split(" ");
  strDate[0] = strDate[0] + ",";
  var temp = strDate[1];
  strDate[1] = strDate[2];
  strDate[2] = temp;
  strDate = strDate.join(" ").slice(0, -1);
  console.log("result: " + strDate);
  return strDate;
}


app.get("/api/:date", function (req, res) {
  const d = req.params.date;
  const result = getDate(d);
  console.log("here: " + result);
  if(!result) {
    res.json({"error": "Invalid Date"});
  } else {
    res.json(result);
  }
});

app.get("/api/", function (req, res) {
  const result = getDate(null);
  if(!result) {
    res.json({"error": "Invalid date"});
  } else {
    res.json(result);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

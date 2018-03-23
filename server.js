const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');



app.use(express.static(path.join(__dirname, 'build')));

/* body Parser */
// parse application/json
app.use(bodyParser.json())
// create application/json parser
var jsonParser = bodyParser.json();


app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

// http://localhost:8080/urlToControll/
app.post('/urlControll', jsonParser,function(req, res) {

  var urlDaControllare = req.body.urlDaControllare;

  var statusCode;
  
  request(urlDaControllare, function (error, response, body) {
    
  if(response)  res.send({"statusCode":response.statusCode});

  else res.send({"statusCode":'error'});

    });
    
});

app.listen(process.env.PORT || 5000);
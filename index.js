var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session')

app.use(session({ secret: 'keyboard cat'}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/register', function(request, response) {
  response.sendFile(__dirname + '/public/register.index.html')
});

app.get('/login', function(request, response) {
  response.sendFile(__dirname + '/public/LogIn.html')
});

app.get('/forgot_password', function(request, response) {
  response.sendFile(__dirname + '/public/ForgotPassword.html')
});

app.get('/animals', function(request, response) {
  response.sendFile(__dirname + '/public/animals.html')
});

app.post('/new_user',function(request,response){
	fs.writeFile('db.json', JSON.stringify(request.body), function(){
	}); 
	request.session.first_name = request.body.first_name
	response.sendFile(__dirname + "/public/index.html");
	console.log(request.session)
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
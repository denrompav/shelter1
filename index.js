var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs         = require('fs');
var session    = require('express-session');
var mongoose   = require('mongoose');
var url        = require('url');

app.set('views', __dirname + "/public/views")
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(session({ secret: 'keyboard cat'}));
mongoose.connect('mongodb://localhost/my_database');


// app.post('/new_user',function(request,response){
// 	fs.writeFile('db.json', JSON.stringify(request.body), function(){
// 	}); 
// 	request.session.first_name = request.body.first_name
// 	response.sendFile(__dirname + "/public/index.html");
// 	console.log(request.session)
  
// });

// Schemas\
var animalSchema = mongoose.Schema({
  name: String,
  age: Number,
  photo_url: String,
  gender: String
});


var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  number: String,
  password: String,
  admin: Boolean
});

var Animal = mongoose.model('Animal', animalSchema);
var User = mongoose.model('User', userSchema);


// ----- ROUTES

app.get('/animals.json', function(req, res) {
  Animal.find(function(err, animals) {
    res.json(animals);
  });
});

app.get('/animals', function (req, res) {
  res.render('animals');
});

app.post('/animals', function(req, res) {
  // params.data
  // data -> new Animal
  console.log(req.body)
  var animal = new Animal({name: req.body.name, gender: req.body.gender, age: req.body.age})
  animal.save(function (err) {
    if (err) console.log(err);
  // saved!
  })
  res.render('animals');
});

app.post('/users', function(req, res) {
  // params.data
  // data -> new Animal
  console.log(req.body)
  var user = new User({email: req.body.email,first_name: req.body.first_name, last_name: req.body.last_name, number: req.body.number,password:req.body.password,admin:false})
  user.save(function (err) {
    if (err) console.log(err);
  // saved!
  })
  res.render('animals');
});

app.get('/users.json', function(req, res) {
  User.find(function(err, user) {
    res.json(user);
  });
});

app.get('/animals/new', function(req, res) {
  // animal form
  res.render('animals_form');
});

app.get('/animals/:id',function(req, res) {
  // get single animal
});

app.get('/', function (req, res) {
  if (req.session.first_name) {
    res.render('index', { currentUser: {first_name: req.session.first_name, last_name: req.session.last_name}});
  } else {
    res.render('index')
  }
});



app.get('/forgot_password', function (req, res) {
  res.render('forgot_password');
});

app.get('/login', function (req, res) {
  res.render('log_in');
});

app.post('/login', function(req, res) {
  User.findOne({ 'email': req.body.email }, function (err, user) {
  if (err) return console.log('Емейл не зареєстрований або пароль невірний!');
    if (user.password == req.body.password) {
      req.session.first_name = user.first_name;
      // req.session.user.last_name == user.last_name;
      res.redirect('/');      
    } else {
      res.render('log_in')
    }
  }) 
})

app.get('/logout',function(req , res){
  req.session.destroy();
  res.redirect('/')
})

app.get('/register', function (req, res) {
  res.render('register');
});


// ----
app.listen(8000, function () {
  console.log('Shelter running on port 8000!!!!');
});

//  -- ------- ----- ----  --
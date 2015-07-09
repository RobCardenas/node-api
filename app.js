var express = require("express");
var bodyParser = require('body-parser');
var _ = require("underscore");
var app = express();

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));
 
//pre seeded user data
var users = [
  {id: 1, username: 'Rob', firstname: 'hell yeah', lastname: 'car', age: 30},
  {id: 2, username: 'Fer', firstname: 'mombo', lastname: 'truck', age: 47}
];

//ROUTES
// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// users indes
app.get('/users', function (req, res) {
// send all users as JSON response
  res.json(users);
});

//create new user
app.post('/users', function (req, res) {
	var newUser = req.body;

	// set sequential id (last id in `users` array + 1)
  if (users.length > 0) {
    newUser.id = users[users.length - 1].id +  1;
  } else {
    newUser.id = 0;
  }
	
	users.push(newUser);
	res.json(newUser);
});


//update user
app.put('/users/:id', function(req, res) {

  // set the value of the id
  var userId = parseInt(req.params.id);
  // find item in `users` array matching the id
  var targetUser = _.findWhere(users, {id:userId});
  // update the user's username
  targetUser.username = req.body.username;
  // update the user's firstname
  targetUser.firstname = req.body.firstname;
  // update the user's lastname
  targetUser.lastname = req.body.lastname;
  // update the user's age
  targetUser.age = req.body.age;
  // send back edited object
  res.json(targetUser);
});

// delete user
app.delete('/users/:id', function(req, res) {
  
  // set the value of the id
  var userId = parseInt(req.params.id);

  // find item in `users` array matching the id
  var targetUser = _.findWhere(users, {id:userId});
  // get the index of the found item
  var index = users.indexOf(targetUser);
  // remove the item at that index, only remove 1 item
  users.splice(index, 1);
  // send back deleted object
  res.json(targetUser);
});

app.listen(3000);
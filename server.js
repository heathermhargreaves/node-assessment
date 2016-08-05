var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var users = require('./users.json');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//GET

//1. get all users (done)
app.get('/api/users', function(req, res, next) {
  res.status(200).json(users);
});

// 2. get all users by language (incomplete)
app.get('/api/users?language=', function(req, res, next) {
  var language = req.params.language;
  var results = [];
  for(var i = 0; i < users.length; i++) {
    if(language === users[i].language) {
      results.push(users[i]);
    }
    return results;
  }
  res.status(200).json(results);
});

// //3. get all users by privilege (incomplete)
// app.get('/api/users/:privilege', function(req, res, next) {
//   var priv = req.params.privilege;
//   var results = users.filter(function(n) {
//     if(users[n].type === priv) {
//       return true;
//     }
//     return false;
//   });
//   res.status(200).json(results);
// });

//9. Find one user by id, if that user doesn't exist, return 404 (done)
app.get('/api/users/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
    if(!users[id - 1]) {
      res.status(404);
    }
    else {
      res.status(200).send(users[id - 1]);
    }
});
//POST

//4. Create new user
app.post('/api/users', function(req, res, next) {
  var newUser = {
    'id': users.length + 1,
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'email': req.body.email,
    'gender': req.body.gender,
    'language': req.body.language,
    'age': req.body.age,
    'city': req.body.city,
    'state': req.body.state,
    'type': req.body.type,
    'favorites': req.body.favorites
  };
  users.push(newUser);
  res.status(200).json(newUser);
});

//5. create new admin user (done)
app.post('/api/users/admin', function(req, res, next) {
  var newAdminUser = {
    'id': req.body.id,
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'email': req.body.email,
    'gender': req.body.gender,
    'language': req.body.language,
    'age': req.body.age,
    'city': req.body.city,
    'state': req.body.state,
    'type': 'admin',
    'favorites': req.body.favorites
  };
  users.push(newAdminUser);
  res.status(200).json(newAdminUser);
});

//6. Change a user's language
app.post('/api/users/language/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  users[id].language = req.body.language;
  res.status(200).json({language: users[id].language});
});

//7. Add user to forums
// app.post('/api/users/forums/:id', function(req, res, next) {
//   var forum = req.body.new;
//   var userId = req.params.id;
//   for(var i = 0; i < users.length; i++){
//     if(id === users[i].id) {
//       res.status(200).json(users[id]);
//       console.log(users[id]);
//     }
//     else {
//       res.status(404);
//     }
//
// });

//PUT

//12. update one user by id

//DELETE

//8. Remove a user's favorite forums
app.delete('/api/users/:id/?favorites=', function(req, res, next) {
  var id = parseInt(req.params.id);
  var result = users[id].favorites.splice(indexOf(req.body.favorites, 1));
  res.status(200).send(result);
})

//10. Ban (delete) a user
app.delete('/api/users/:id', function(req, res, next) {
  var id = req.body.id;
  for(var i = 0; i < users.length; i++) {
    if (id === users.id) {
      users = users.splice(i,1);
      res.status(200).send('deleted user with id: ' + (i+1));
    }

  }
});




var port = 3000;
app.listen(port, function() {
  console.log("Started server on port", port);
}); //end server

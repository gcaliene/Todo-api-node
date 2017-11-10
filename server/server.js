//server.js file is just responsible for our routes
const express = require('express');
const bodyParser = require('body-parser');
var _ = require('lodash');
var {ObjectID} = require('mongodb');


//we need body-parser to send json to the server. takes string body and converts it to js object

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 4000;

//app.use to configure the middleware, if custom it will be a function, if 3rd party then access something of off the library
app.use(bodyParser.json());//the return value from this json method is a function and that is the middleware we send to express







//////////      ////  POST  ////  todos   //////
app.post('/todos', (req,res) => {
  //console.log(req.body); //where the body gets stored by body-Parser
  var todo = new Todo ({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e.errors.text.message);
  });
});

////////////////// User POST /////////////////
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  // User.findByToken
  // user.generateAuthToken //going to be responsible for adding a token to an id save it and send it back to user

  user.save().then((user) => {
    return user.generateAuthToken(); //we are returning it because we are expecting a chain promise
    // res.send(user);
  }).then((token)=> {
    res.header('x-auth', token).send(user); //header(header name, value you want to set the header to), x-auth is a custom header because of jwt shema method
  }).catch((e) => {
    res.status(400).send(e);
  })
});




///////\\\\\//////////\\\\\\\\\\\\\\GET//////\\\\\\\\\\\\\\\\\///////////
////we want all the todos
app.get('/todos' , (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos}) //when passing back an array, create an object. it opens up to a more flexible future
  }, (e) => {
    res.status(400).send(e.errors.text.message);
  });
});

///''''''""""""""""""""""""" Get Todos by ID ''''''''''''

app.get('/todos/:id', (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


  // res.send(req.params); sending a get request will show you the inputteed id


/////////\\\\\\\\ SERVER /////////////\\\\\\\\\\
app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = {app}; //we are now ready to load those two files in for testing

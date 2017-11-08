//server.js file is just responsible for our routes
const express = require('express');
const bodyParser = require('body-Parser');
//we need body-parser to send json to the server. takes string body and converts it to js object

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//app.use to configure the middleware, if custom it will be a function, if 3rd party then access something of off the library
app.use(bodyParser.json());//the return value from this json method is a function and that is the middleware we send to express

app.post('/todos', (req,res) => {
  //console.log(req.body); //where the body gets stored by body-Parser
  var todo = new Todo ({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e.errors.text.message);
  })
});

app.listen(4000, () => {
  console.log('started on port 4000');
});

require('./config/config');
//server.js file is just responsible for our routes
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

//we need body-parser to send json to the server. takes string body and converts it to js object

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

//app.use to configure the middleware, if custom it will be a function, if 3rd party then access something of off the library
app.use(bodyParser.json()); //the return value from this json method is a function and that is the middleware we send to express

//////////      ////  POST  ////  todos   //////
app.post('/todos', authenticate, (req, res) => {
  //to make the app private we have to add the authenticate middleware
  //console.log(req.body); //where the body gets stored by body-Parser
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e.errors.text.message);
    }
  );
});

////////////////// User POST ////////register/////////
app.post('/users', async (req, res) => {
  try {
    const body = await _.pick(req.body, ['email', 'password']);
    const user = await new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    return res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Old version with promises
// app.post('/users', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);
//   var user = new User(body);
//   // User.findByToken
//   // user.generateAuthToken //going to be responsible for adding a token to an id save it and send it back to user
//   user
//     .save()
//     .then(user => {
//       return user.generateAuthToken(); //we are returning it because we are expecting a chain promise
//       // res.send(user);
//     })
//     .then(token => {
//       //res.header lets us set a header while req.header allows us to see that header
//       res.header('x-auth', token).send(user); //header(header name, value you want to set the header to), x-auth is a custom header because of jwt shema method
//     })
//     .catch(e => {
//       res.status(400).send(e);
//     });
// });

///////////////USER LOGIN //////////////
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    return res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

////Old way with promises
// app.post('/users/login', (req, res) => {
//   let body = _.pick(req.body, ['email', 'password']);
//
//   User.findByCredentials(body.email, body.password)
//     .then(user => {
//       // res.send(user);
//       return user.generateAuthToken().then(token => {
//         //return will keep the chain alive
//         res.header('x-auth', token).send(user);
//       });
//     })
//     .catch(e => {
//       res.status(400).send();
//     });
// });

/////////\\\\\\\\\\\\\\////USER DELETE //////////\\\\\\\\\\\////////\\\\\\\\\\\

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});
// // Old way with promises
// app.delete('/users/me/token', authenticate,  (req, res)=> {
//   req.user.removeToken(req.token).then(()=> {
//     res.status(200).send();
//   }, ()=> {
//     res.status(400).send();
//   });
// });

///////\\\\\//////////\\\\\\\\\\\\\\GET//////\\\\\\\\\\\\\\\\\///////////
///////////////USER GET TODOS////////\\\\\\\\.

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // var token = req.header('x-auth'); //x-auth is the key to get the value
  //
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject(); //goes down to the catch
  //   }
  //   res.send(user);
  // }).catch((e)=>{
  //   res.status(401).send();
  // });
});

////we want all the todos
app.get('/todos', authenticate, (req, res) => {
  //just the todos for the currently logged in user
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos }); //when passing back an array, create an object. it opens up to a more flexible future
    },
    e => {
      res.status(400).send(e.errors.text.message);
    }
  );
});

///''''''""""""""""""""""""" Get Todos by ID ''''''''''''

app.get('/todos/:id', authenticate, (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// res.send(req.params); sending a get request will show you the inputteed id

/////////////\\\\\\\\\\\\\\\\\\\\\ DELETE ////////////\\\\\\\\\\\\\\\\\
app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    if (!todo) {
      return res.status(404).send();
    }
    return res.send({ todo }); //remember to send an object ya dummy
  } catch (e) {
    res.status(400).send();
  }
});

////Old way using promises
// app.delete('/todos/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   })
//     .then(todo => {
//       if (!todo) {
//         return res.status(404).send();
//       }
//
//       res.send({ todo }); //remember to send an object ya dummy
//     })
//     .catch(e => {
//       res.status(400).send();
//     });
// });

//////////////\\\\\\\\\\\\ PATCH ///////////\\\\\\\\\\\\\\

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); //this is the reason for ladash, the req.body is where the updaates are stored

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    {
      _id: id,
      _creator: req.user._id
    },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      //if todo exist, then it can get sent back
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

/////////\\\\\\\\ SERVER /////////////\\\\\\\\\\
app.listen(port, () => {
  console.log(
    `Started on port ${port} & the Mongo DB is: ${process.env.MONGODB_URI}`
  );
});

module.exports = { app }; //export now ready to load those 4 files in for testing

const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

//
// Todo.findOneAndRemove({_id: '57c4610dbb35fcbf6fda1154'}).then((todo) => { //<--- this will return the doc that was deleted
//
// });

Todo.findByIdAndRemove('5a05f77a787ee20f2cee2812').then((todo) => { //<--- this will return the doc that was deleted also
  console.log(todo);
});

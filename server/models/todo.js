var mongoose = require('mongoose');


//model first argument is the string name, and second is the object that defines the properties of the model
var Todo = mongoose.model('Todo', {
  text: {type: String, required: true, minlength:1, trim:true},
  completed: {type:Boolean, default: false},
  completedAt: {type: Number, default:null},
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  }
})

module.exports = {Todo};

// var newTodo = new Todo({
//   text: 'cook dinner', //nothing is required so we just added this
// });
//
// //__v is a mongoose property
// //save() is how we save to the mongodb
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

//we should not add empty files to the database, thats why we need required:true (ie validators)
// var otherTodo = new Todo ({
//   text: 'Something to do' //numbers and booleans will be converted to Booleans, typecasting
//   // completed: true,
//   // completedAt: 1111111
// })
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo');
// });

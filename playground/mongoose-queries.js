const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} =require('./../server/models/user')

var id = '5a05daad49ed8c3eb49c7aae'; //mongoose is going to convert it to objectID needed

if (!ObjectId.isValid(id)){
  console.log('ID not valid');
}


// Todo.find({
//   _id: id //mongoose is going to convert it to objectID needed
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id //mongoose is going to convert it to objectID needed
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//

// Todo.find({
//   _id: id,
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// //if you are finding something other than Id, then use findOne
// Todo.findOne({
//   _id: id//mongoose is going to convert it to objectID needed
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// //if you want to find one by id then use this!!!!!/////
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e.message));

/////////////////////Users /////////////////////
var email = 'email@email.com';
var userId = '5a0345f38d90573ee8fe9c2a'

User.find({
  email:email
}).then((users)=>{
  console.log(users);
});

User.findOne({
  _id: userId
}).then((user)=> {
  console.log(user);
});

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('user not found');
  }
  console.log('User By Id', user);
}, (e)=>{
  console.log(e.message)
})

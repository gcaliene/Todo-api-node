var mongoose = require('mongoose');


var User = mongoose.model('User', {
  email: {type: String, minlength:1, trim: true, required:true}
});

module.exports = {
  User:User
}
//below are the examples
// var newUser = new User ({
//   email: ''
// });
// //remember p.then(fulfilled, rejected)
// newUser.save().then((doc) => {
//   console.log('saved user', doc);
// }, (e) => {
//   console.log('unable to save user');
// })

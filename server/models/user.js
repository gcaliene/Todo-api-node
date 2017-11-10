const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//we can't add on to user but we can add custom methods to UserSchema
var UserSchema = new mongoose.Schema({
  email: {type: String, minlength:1, trim: true, required:true,
    unique: true, //won't pass in if there is another email
    validate: {
      validator: (value) => {
        return validator.isEmail(value); //returns true if valid
      },
      message: `{VALUE} is not a valid email` //this is from the mongoose validation api docs
    }
  },
  password:{
    type: String,
    require:true,
    minlength:6
  },
  tokens:[{
    access: {
      type: String,
      required:true
    },
    token: {
      type: String,
      required:true
    }
  }]
});

//we are goign to use a method to determin what exactly gets sent back when a mongoose model is converted to json value
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject(); //takes mongoose variable "user" and convert to a regular object where only the properties available on the doc exist
  return _.pick(userObject, ['_id', 'email']); //thus leaving things off like the password and token from being displayed
}; //the header x-auth is still being passed on in the header and


//line reight below is an object that you acn add any method you like, an instance method
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push ({access, token}); //rememberthat tokens is an empty array
  return user.save().then(()=> {
    return token;
  }); /// here we save the changes
}

var User = mongoose.model('User', UserSchema);

////////Below was used before the UserSchema from above ///////
// var User = mongoose.model('User', {
//   email: {type: String, minlength:1, trim: true, required:true,
//     unique: true, //won't pass in if there is another email
//     validate: {
//       validator: (value) => {
//         return validator.isEmail(value); //returns true if valid
//       },
//       message: `{VALUE} is not a valid email` //this is from the mongoose validation api docs
//     }
//   },
//   password:{
//     type: String,
//     require:true,
//     minlength:6
//   },
//   tokens:[{
//     access: {
//       type: String,
//       required:true
//     },
//     token: {
//       type: String,
//       required:true
//     }
//   }]
// });




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

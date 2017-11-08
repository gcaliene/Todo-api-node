const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id: 10
}

//token is the value we send to the user when they sign up/login
var token = jwt.sign(data, '123abc') // takes the object and creates the token
console.log(token);
var decoded = jwt.verify(token, '123abc'); //take that token and secret and it makes sure that dat awas not manipulated
console.log("decoded", decoded);

//we get 2 functions, 1 to create token and one to verify token

// var message = 'I am userdf number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
// var data = {
//   id: 4
// };
//
// //salting the hash means you add something else to the hash ex: password + sdfsdf = new hash
// var token = {
//   data:data, //equal to the data property defined above
//   hash: SHA256(JSON.stringify(data)+ 'somesecret').toString() //toString will store the resulting hash into the hash property
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('Data was changed don\'t trust');
// };

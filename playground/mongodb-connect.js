//mongo client lets you connect ot mongo server
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code above

// var obj = new ObjectID();
// console.log(obj);

//es6 destructring
var user = {name: 'andrew', age: 25};
var {name} = user;
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 2nd object is what commands we issue
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //the return prevents anything below from going. or add else
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'somthing to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to inset todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2)); //ops attribute is goign to store all of the docs that were inserted
  // });

  db.collection('Users').insertOne({
    // _id: 123, //the _id will be random if left out
    name: 'Gerson',
    age: false,
    location: 'Tampa,FL'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert User', err);
    }

    // console.log(JSON.stringify(result.ops, undefined, 2)); //ops attribute is goign to store all of the docs that were inserted
    console.log(result.ops[0]._id.getTimestamp());// this gets the created at timestamp
  });


  db.close();
});

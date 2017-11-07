//mongo client lets you connect ot mongo server
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 2nd object is what commands we issue
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //the return prevents anything below from going. or add else
  }
  console.log('Connected to MongoDB server');

// // findOneAndUpdate(filter, update, options, callback) Returns:
// // Promise if no callback passed
// //we need to use Update Operators
//   db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID('5a01deb845b247378a12cd09')
//   }, {
//     $set: {
//       completed: true
//     }
//   }, {
//     returnOriginal: false //returnOriginal returns true by default and return unupdated object
//   }).then( (result) => {
//     console.log(result.value);
//   })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a01f8ae45b247378a12d0a0')
  }, {
    $set: {
      name: 'yon'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal:false
  }).then ( (result) => {
    console.log(result.value);
  })

  // db.close();
});

const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 2nd argument is what commands we issue
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //the return prevents anything below from going. or add else
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result); //n is the number of records that were deleted.
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((results) => {
  //   console.log(results.result); //results argument is CommandResult and n:1 for one doc deleted
  // })

  // // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result); //you actually get the actual document deleted, and that is why findOneAndDelete is handy
  // })

  db.collection('Users').deleteMany({name: 'Gerson'}).then((result) => {
    console.log(result.result); //n is the number of records that were deleted.
  });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5a01e29645b247378a12ce8f")
  }).then((results) => {
    console.log(results.value.name);
  })

  // db.close();
});

//mongo client lets you connect ot mongo server
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 2nd object is what commands we issue
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //the return prevents anything below from going. or add else
  }
  console.log('Connected to MongoDB server');
  //
  // db.collection('Todos').find(
  //   //{ _id: new ObjectID('5a01d6fa45b247378a12caa9')}// we cant just type in the id string need ObjectID string
  // ).count().then((count) => { //before count() there was toArray().
  //   console.log('Todos');
  //   console.log(`Todos count: ${count}`);
  //   // console.log(docs);
  //   // console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unbabale to fecth todos', err);
  // });


    db.collection('Users').find( {name: 'Gerson'} //find just brings the cursor needs toArray or count
      //{ _id: new ObjectID('5a01d6fa45b247378a12caa9')}// we cant just type in the id string need ObjectID string
    ).toArray().then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
      // console.log(docs);
      // console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unbabale to fecth users', err);
    });


  // db.close();
});

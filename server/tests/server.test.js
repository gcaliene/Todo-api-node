//mocha and nodemon don't need to be required
const expect = require('expect');
const request = require('supertest');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

//we have to make sure that the databse is empty
beforeEach((done) => { //it is going to move to the test case once we call done
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }). then( () => {
    done();
  }) // so our databse is going to empty before every request
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text:text})  // obj is going to converted to json because of supertest
      .expect(200) //expect status to be 200
      .expect((res) => { //custom expect calls do get passed in the respnse
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err); //return just stops the function execution and function down below dont get executed
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1); //this assumes if the todos database are empty
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e)); //this is the expression statement syntax instead of arrow function syntax
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({}) //this is the error
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

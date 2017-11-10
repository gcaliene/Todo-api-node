var mongoose = require('mongoose');

//promises didn't used to be a part of js, so we tell mongoose to use builtin promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'), {
  useMongoClient: true //this line has to be added due to deprecation
});

module.exports = {
  mongoose: mongoose
}

//BAD idea TO HAVE CONFIG VARIABLE AS PART OF YOUR REPOSITORY

var env = process.env.NODE_ENV || 'development';
console.log(env, '!!!!!!!!!!!!!');

if (env=== 'development' || env === 'test') {
  var config = require('./config.json');
  // console.log(config);
  var envConfig = config[env]; //when u want a variable to access a property, you have to use bracket notation
  // console.log(Object.keys(envConfig.PORT));
  Object.keys(envConfig).forEach((key)=> { //the key will be PORT and MONGODB_URI
    process.env[key] = envConfig[key];
  });
}

// if(env ==='development'){
//   process.env.PORT = 4000;
//   process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
//   console.log("Running on port:" + process.env.PORT + " Mongo DB is:"+ process.env.MONGODB_URI );
// } else if (env === 'test') {
//   process.env.PORT = 4000;
//   process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest';
//   console.log(process.env.PORT, process.env.MONGODB_URI );
// }

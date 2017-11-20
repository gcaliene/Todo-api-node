var env = process.env.NODE_ENV || 'development';
console.log(env, '!!!!!!!!!!!!!');

if(env ==='development'){
  process.env.PORT = 4000;
  process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
  console.log("Running on port:" + process.env.PORT + " Mongo DB is:"+ process.env.MONGODB_URI );
} else if (env === 'test') {
  process.env.PORT = 4000;
  process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest';
  console.log(process.env.PORT, process.env.MONGODB_URI );
}

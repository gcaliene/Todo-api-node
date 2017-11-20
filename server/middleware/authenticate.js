const {User} = require('./../models/user')

const authenticate = (req,res,next) => { //thisis the middleware used to make the route private. also the actual route wont get run unless next is called
  var token = req.header('x-auth'); //x-auth is the key to get the value

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); //goes down to the catch
    }
    // res.send(user);
    req.user = user;
    req.token = token;
    next(); //is needed because the get route down below won't execute unless it is ran;
  }).catch((e)=>{
    res.status(401).send();//not calling next because we are not going to keep going in this
  });
};
module.exports = {authenticate};

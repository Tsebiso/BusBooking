const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
    var token = req.body.token ? req.body.token : req.params.token
    jwt.verify(token, 'w', function(err, decoded){
      if(!err){
        
        let myObj = JSON.parse(decoded.user_details);
        console.log('myObj', myObj)

        req.body._id = myObj.id;
        req.body.usertype = myObj.userType;
        
        next();
      } else {
        res.status(400).json({msg :'No token found! Please Provide a token.'})
      }
    })
  }

module.exports.verifyUsertype = (req, res, next) => {
    if(req.body.usertype == 'admin'){
        next();
    } else {
        res.status(400).send('User access denied')
    }
}
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = (req, res, next) => {

    try {
      const token = req.header('Authorization');
      console.log(token);
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log('decoded token >>>>', decodedToken);
      const userId = decodedToken.id;
      console.log('userID >>>> ', userId);
      User.findByPk(userId).then(user => {
        console.log(JSON.stringify(user));
        req.user = user; ///very important
        next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }
      

}

module.exports = {
    authenticate
}

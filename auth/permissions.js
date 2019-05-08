const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = process.env.SECRET

  jwt.verify(token, secret, (err, dToken) => { 
    if(!err) {
      res.dToken = dToken
      next()
    }
    else {
      res.status(401).json({ message: 'you missing something' })
    }
  })
}
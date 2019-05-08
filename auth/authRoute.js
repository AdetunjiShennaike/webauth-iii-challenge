const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Users = require('../data/models/userModel');

//set error msgs
const sendError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}`});
};


//token function
function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['standard', 'student']
  }
  const secret = process.env.secret
  const options = { 
    expiresIn: '20h'
  }

  return jwt.sign(payload, secret, options)
}


router.post('/register', (req, res) => {
  const user = req.body
  
  const hash = bcrypt.hashSync(user.password, 8) 
  user.password = hash

  Users
  .insert( newUser => {
    res.status(201).json(newUser)
  })
  .catch( err => {
    return sendError(500, err, res)
  })
})

router.post('/login', (req, res) => {

})


module.exports = router;
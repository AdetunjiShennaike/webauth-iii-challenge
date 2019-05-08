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
  const { username, password } = req.body
  const user = { username, password }
  
  const hash = bcrypt.hashSync(user.password, 8) 
  user.password = hash

  Users
  .insert(user)
  .then( newUser => {
    res.status(201).json(newUser)
  })
  .catch( err => {
    return sendError(500, err, res)
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users
  .getByUser({ username })
  .then( user => {
    if ( user && bcrypt.compareSync(password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        message: `Welcome ${user.username}`, 
        token
      })
    }
    else {
      return sendError(401, 'try again', res)
    }
  })
  .catch( err => {
    return sendError(500, err, res);
  })

})


module.exports = router;
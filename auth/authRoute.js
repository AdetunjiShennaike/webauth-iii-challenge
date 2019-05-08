const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../data/models/userModel');

//set error msgs
const sendError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}`});
};

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
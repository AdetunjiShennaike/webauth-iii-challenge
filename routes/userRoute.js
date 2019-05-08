const router = require('express').Router();

const Users = require('../data/models/userModel');
const permissions = require('../auth/permissions');

//set error msgs
const sendError = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}`});
};

//check middleware 
function accountCheck(role) {
  return function (req, res, next) {
    if ( req.dToken && req.dToken.roles && req.dToken.roles.includes(role)) {
      next();
    }
    else {
      return sendError(403, err, res)
    }
  }
}


router.get('/', permissions, accountCheck('standard'), (req, res) => {
  Users.get()
  .then( users => {
    res.status(200).json( users );
  })
  .catch(err => {
    return sendError(500, err, res);
  })
})


module.exports = router;
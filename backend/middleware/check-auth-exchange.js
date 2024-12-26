const securityConfig = require('../config/config-service').getConfig();

module.exports = (req, res, next) => {
  let token;
  if (req.method === 'OPTIONS') {
    return next();
  }
  //console.log('auth-middleware', req.headers.authorization);
  if (req.body.token == securityConfig.token) {
    next();
  } else {
    return res.status(401).json({message: 'Authentification falied'});
  }
};

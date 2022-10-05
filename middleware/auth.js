const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken=(req, res, next)=> {
  console.log(req.headers["authorization"].split(' ')[1])
  const token =
    req.body.token || req.query.token || req.headers["authorization"].split(' ')[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log(decoded,'decode')
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(err);
  }
  return next();
};



module.exports = verifyToken;
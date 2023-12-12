const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ msg: "Please Login!", status: 403 });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
      if (err) {
        return res.json({ msg: "please login!", status: 404 });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  }
};

module.exports = { authentication };

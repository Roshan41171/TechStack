const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "User not Logged In" });
  }
  try {
    const validToken = verify(accessToken, "importantsecret");
    if (validToken) {
      return next();
    }
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = { validateToken };

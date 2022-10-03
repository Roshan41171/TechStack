const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const saltRounds = 10;
const userDetails = require("../models/user");

router.post("/insert/user", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new userDetails({
    name: name,
    email: email,
    password: hashedPassword,
  });

  await user.save();
  res.send(user);
});

router.get("/admin/fetchUsers", async (req, res) => {
  const result = await userDetails.find();
  res.send(result);
});

router.post("/login/user", async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await userDetails.findOne({ email });

  if (!oldUser) return res.send({ message: "User doesnot exists." });

  const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

  if (!isPasswordCorrect) return res.send({ message: "Invalid Credentials" });

  const accessToken = sign(
    { email: oldUser.email, id: oldUser._id },

    "importantsecret"
  );

  req.session.user = oldUser;
  res.json({ token: accessToken, email: oldUser.name, id: oldUser._id });
});

router.put("/update/password/:id", async (req, res) => {
  const id = req.params.id;
  const old_password = req.body.old_password;
  const new_password = req.body.new_password;

  const oldUser = await userDetails.findById(id);

  const isPasswordCorrect = await bcrypt.compare(
    old_password,
    oldUser.password
  );
  if (!isPasswordCorrect) {
    return res.send({ message: "Incorrect Old Password" });
  } else {
    hashed_password = await bcrypt.hash(new_password, saltRounds);
    await userDetails.findByIdAndUpdate(id, { password: hashed_password });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const cartDetails = require("../models/cart");

router.post("/insert/product", async (req, res) => {
  const {
    name,
    price,
    count,
    userId,
    userName,
    memory,
    battery,
    os,
    size,
    frontcamera,
    backcamera,
    ports,
    dng,
  } = req.body;

  const product = new cartDetails({
    name: name,
    price: price,
    count: count,
    userId: userId,
    userName: userName,
    memory: memory,
    battery: battery,
    os: os,
    size: size,
    frontcamera: frontcamera,
    backcamera: backcamera,
    ports: ports,
    dng: dng,
  });

  await product.save();
  res.send(product);
});

router.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  const result = await cartDetails.find({ userId: id });
  res.send(result);
});

router.get("/admin/fetchData", async (req, res) => {
  const result = await cartDetails.find();
  res.send(result);
});

router.put("/update/count", async (req, res) => {
  const increaseCount = req.body.increaseCount;
  const id = req.body.id;
  await cartDetails.findByIdAndUpdate(id, { count: increaseCount });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await cartDetails.findByIdAndRemove(id).exec();
});

module.exports = router;

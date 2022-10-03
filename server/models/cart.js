const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: String,
  price: {
    type: Number,
  },
  count: {
    type: Number,
    default: 1,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  memory: String,
  battery: String,
  os: String,
  size: String,
  frontcamera: {
    type: String,
    default: "",
  },
  backcamera: {
    type: String,
    default: "",
  },
  ports: {
    type: String,
    default: "",
  },
  dng: {
    type: String,
    default: "",
  },
});

const newcartDetails = mongoose.model("carts", cartSchema);
module.exports = newcartDetails;

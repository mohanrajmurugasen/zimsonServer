const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("../models");

router.use(cors());

process.env.SECRET_KEY = "user";

router.post("/nonpurchase", (req, res) => {
  const userData = {
    user: req.body.user,
    location: req.body.location,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
    birthday: req.body.birthday,
    anniversary: req.body.anniversary,
    about: req.body.about,
    price: req.body.price,
    brand: req.body.brand,
    reason: req.body.reason,
    star: req.body.star,
  };

  db.nonpurchase
    .create(userData)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/nonpurchase", async (req, res) => {
  await db.nonpurchase
    .findAll()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = router;

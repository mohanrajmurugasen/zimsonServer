const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("../models");

router.use(cors());

process.env.SECRET_KEY = "user";

router.post("/purchase", (req, res) => {
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
    brand: req.body.brand,
    star: req.body.star,
    reason: req.body.reason,
    family: req.body.family,
    rate: req.body.rate,
    family2: req.body.family2,
  };

  db.purchase
    .create(userData)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/purchase", async (req, res) => {
  await db.purchase
    .findAll()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.get("/purchaseById/:location/:brand/:star/:rate", async (req, res) => {
  await db.purchase
    .findAll({
      where: {
        location: req.params.location,
        brand: req.params.brand,
        star: req.params.star,
        rate: req.params.rate,
      },
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

module.exports = router;

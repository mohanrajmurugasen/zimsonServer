const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("../models");

router.use(cors());

process.env.SECRET_KEY = "user";

router.post("/brand", (req, res) => {
  const userData = {
    name: req.body.name,
  };

  db.brand
    .findOne({
      where: {
        name: req.body.name,
      },
    })
    .then(async (user) => {
      if (!user) {
        db.brand
          .create(userData)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send(err.message);
          });
      } else {
        res.send("Brand already exist");
      }
    });
});

router.get("/brand", async (req, res) => {
  await db.brand
    .findAll()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.delete("/brand/:id", async (req, res) => {
  await db.brand
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      res.send("Deleted Successfully");
    })
    .catch((err) => res.send(err.message));
});

router.put("/brand/:id", async (req, res) => {
  await db.brand
    .update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((user) => {
      res.send("Updated Successfully");
    })
    .catch((err) => res.send(err.message));
});

router.get("/rate", async (req, res) => {
  res.send([
    { id: 1, val: "Store team not friendly" },
    { id: 2, val: "Product range not good" },
    { id: 3, val: "Others" },
  ]);
});

router.get("/price", async (req, res) => {
  res.send([
    { id: 1, val: "Below 5K" },
    { id: 2, val: "5K - 10K" },
    { id: 3, val: "10K - 20K" },
    { id: 4, val: "20K - 50K" },
    { id: 4, val: "50K - 1L" },
    { id: 4, val: "1L - 5L" },
    { id: 4, val: "5L - 10L" },
    { id: 4, val: "10L - 15L" },
  ]);
});

router.get("/quality", async (req, res) => {
  res.send([
    { id: 1, val: "Worst" },
    { id: 2, val: "Bad" },
    { id: 3, val: "Intermediate" },
    { id: 4, val: "Excellent" },
    { id: 4, val: "Good" },
  ]);
});

module.exports = router;

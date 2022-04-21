const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("../models");

router.use(cors());

process.env.SECRET_KEY = "user";

router.post("/location", (req, res) => {
  const userData = {
    name: req.body.name,
  };

  db.location
    .findOne({
      where: {
        name: req.body.name,
      },
    })
    .then(async (user) => {
      if (!user) {
        db.location
          .create(userData)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send(err.message);
          });
      } else {
        res.send("Location already exist");
      }
    });
});

router.get("/location", async (req, res) => {
  await db.location
    .findAll()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.delete("/location/:id", async (req, res) => {
  await db.location
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

router.put("/location/:id", async (req, res) => {
  await db.location
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

module.exports = router;

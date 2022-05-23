const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/login/login");
  });

// USER GAME ROUTE
  router.get("/users", (req, res) => {
    User.findAll().then((users) => {
      res.render("pages/users/index", {
        users,
      });
    });
});

  router.get("/users/create", (req, res) => {
    res.render("pages/users/create");
  });

  router.post('/users', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(() => {
            res.redirect('/users');
        });
});

router.get("/users/:id/edit", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    res.render("pages/users/edit", {
    user,
    });
  });
});

router.put('/users/:id', (req, res) => {
  User.update({
      username: req.body.username,
      password: req.body.password
  },
  {
    where: {
      id: req.params.id,
    },
  }
    ).then(() => {
          res.redirect('/users');
      });
});

router.delete('/users/:id', (req, res) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
  })
      .then(() => {
          res.redirect('/users');
      });
});

//REST API
//GET
router.get("api/users", (req, res) => {
  User.findAll()
      .then(user => {
          res.status(200).json(users)
      })
})










module.exports = router;
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
router.get("/api/users", (req, res) => {
  User.findAll()
      .then(users => {
          res.status(200).json(users)
      })
})

// GET by ID
router.get('/api/users/:id', (req, res) => {
  User.findOne({
      where: { id: req.params.id }
  })
      .then(users => {
          res.status(200).json(users)
      })
})

//POST

router.post('/api/users', (req, res) => {
  User.create({
      username: req.body.username,
      password: req.body.password,
  })
      .then(user => {
          res.status(201).json(user)
      }) .catch(err => {
          res.status(422).json("Tidak bisa menambahkan user")
      })
})

//PUT
router.put('/api/users/:id', (req, res) => {
  User.update({
      username: req.body.username,
      password: req.body.password,
  }, {
      where: { id: req.params.id }
  })
      .then(user => {
          res.status(201).json(user)
  })  .catch(err => {
          res.status(422).json("Tidak bisa mengubah user")
  })
})

//DELETE 
router.delete('/api/users/:id', (req, res) => {
  User.destroy({
      where: { id: req.params.id }
  })
      .then(user => {
          res.sendStatus(204)
      }) .catch(err => {
          res.status(422).json("Tidak bisa menghapus user")
      })
})

// BIODATA USER ROUTE

router.get("/biodata", (req, res) => {
  res.render("pages/biodata/index");
});

router.get("/biodata", (req, res) => {
  Biodata.findAll().then((biodata) => {
    res.render("pages/biodata/index", {
      biodata,
    });
  });
});

router.get("/biodata/create", (req, res) => {
  Biodata.findAll({
    order: [["name", "ASC"]],
  }).then((biodata) => {
    res.render("pages/biodata/create");
  })
  
});








module.exports = router;
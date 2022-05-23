const express = require("express");
const { User } = require("../models");
const { Biodata } = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/login/login");
  });

//LOGIN
// router signin
router.post("/login", (req, res) => {
  User.findOne({
    where: { 
      username: req.body.floatingInput,
      password: req.body.floatingPassword
     }
  }).then(user => {
    if (user) {
      User.findAll().then((users) => {
        res.render("pages/users/index2", {
          users,
        });
      });
    } else {
      res.status(422).json("Tidak ada user")
    }
  }).catch(err => {
    console.log(err)
    res.render("pages/login/login")
  })
})

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

// router.get("/biodata", (req, res) => {
//   res.render("pages/biodata/index");
// });

router.get("/biodata", (req, res) => {
  Biodata.findAll({
    order: [["firstName", "ASC"]],
    include: ["user"],
  }).then((biodata) => {
    res.render("pages/biodata/index", {
      biodata,
    });
  });
});

router.get("/biodata/create", (req, res) => {
  User.findAll({
    order: [["username", "ASC"]],
  }).then((users) => {
    res.render("pages/biodata/create", {
      users,
    });
  });
});

router.post("/biodata", (req, res) => {
  // Database tidak dapat menerima string kosong dalam memasukkan date
  // Jadi harus dilakukan pengecekan untuk konversi string kosong jadi null
  let birthOfDate;
  if (!req.body.birthOfDate) {
    birthOfDate = null;
  } else {
    birthOfDate = req.body.birthOfDate;
  }

  Biodata.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthOfDate: req.body.birthOfDate,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    userId: req.body.userId,
  }).then(() => {
    res.redirect("/biodata");
  });
});

router.get("/biodata/:id", (req, res) => {
  Biodata.findOne({
    where: { id: req.params.id },
  }).then((biodata) => {
    res.render("pages/biodata/show", {
    biodata,
    });
  });
});

router.get("/biodata/:id/edit", (req, res) => {
  Biodata.findOne({
    where: { id: req.params.id },
  }).then((biodata) => {
    res.render("pages/suppliers/edit", {
    supplier,
    });
  });
});

//REST API
//GET
router.get("/api/biodata", (req, res) => {
  Biodata.findAll()
      .then(biodata => {
          res.status(200).json(biodata)
      })
})

// GET by ID
router.get('/api/biodata/:id', (req, res) => {
  Biodata.findOne({
      where: { id: req.params.id }
  })
      .then(biodata => {
          res.status(200).json(biodata)
      })
})










module.exports = router;
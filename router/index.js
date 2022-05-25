const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { User, Biodata, History, Admin } = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/admin/login");
  });

router.get("/dashboard", (req, res) => {
  res.render("pages/home/index");
});

//LOGIN
// router signin
router.post("/login", (req, res) => {
  Admin.findOne({
    where: { 
      username: req.body.username,
      password: req.body.password
     }
  }).then(admin => {
    if (admin) {
      Admin.findAll().then((admin) => {
        res.render("pages/home/index", {
          admin,
        });
      });
    } else {
      res.status(422).json("Tidak ada user")
    }
  }).catch(err => {
    console.log(err)
    res.render("pages/admin/login")
  })
})

// ADMIN ROUTE

router.get("/admin", (req, res) => {
  Admin.findAll().then((admin) => {
    res.render("pages/admin/index", {
      admin,
    });
  });
});

router.get("/admin/create", (req, res) => {
  res.render("pages/admin/create");
});

router.post('/admin', (req, res) => {
  Admin.create({
      username: req.body.username,
      password: req.body.password
  })
      .then(() => {
          res.redirect('/admin');
      });
});

router.get("/admin/:id/edit", (req, res) => {
  Admin.findOne({
    where: { id: req.params.id },
  }).then((admin) => {
    res.render("pages/admin/edit", {
    admin,
    });
  });
});

router.put('/admin/:id', (req, res) => {
  Admin.update({
      username: req.body.username,
      password: req.body.password
  },
  {
    where: {
      id: req.params.id,
    },
  }
    ).then(() => {
          res.redirect('/admin');
      });
});

router.delete('/admin/:id', (req, res) => {
  Admin.destroy({
      where: {
        id: req.params.id,
      },
  })
      .then(() => {
          res.redirect('/admin');
      });
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

// BIODATA USER ROUTE

// router.get("/biodata", (req, res) => {
//   res.render("pages/biodata/index");
// });

router.get("/biodata", (req, res) => {
  Biodata.findAll({
    order: [["firstName", "ASC"]],
    include: ["User"],
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
    include: ["User"],
  }).then((biodata) => {
    res.render("pages/biodata/show", {
    biodata,
    });
  });
});

router.get("/biodata/:id/edit", async (req, res) => {
  const biodata = await Biodata.findOne({
    where: { id: req.params.id },
  });

  const users = await User.findAll({
    order: [["username", "ASC"]],
  });

  res.render("pages/biodata/edit", {
    biodata,
    users,
  });
});

    router.put("/biodata/:id", (req, res) => {
    // Database tidak dapat menerima string kosong dalam memasukkan date
    // Jadi harus dilakukan pengecekan untuk konversi string kosong jadi null
      let birthOfDate;
      if (!req.body.birthOfDate) {
      birthOfDate = null;
      } else {
      birthOfDate = req.body.birthOfDate;
      }
    
      Biodata.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthOfDate: req.body.birthOfDate,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      userId: req.body.userId,
      },
      {
        where: { id: req.params.id,
      },
    }).then(() => {
      res.redirect("/biodata");
    });
});

router.delete("/biodata/:id", (req, res) => {
  Biodata.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("/biodata");
  });
});

// HISTORY PAGE ROUTE

router.get("/history", (req, res) => {
  History.findAll({
    include: ["user"],
  }).then((history) => {
    res.render("pages/history/index", {
      history,
    });
  });
});

router.get("/history/create", (req, res) => {
  User.findAll({
    order: [["username", "ASC"]],
  }).then((users) => {
    res.render("pages/history/create", {
      users,
    });
  });
});

router.post("/history", (req, res) => {
  // Database tidak dapat menerima string kosong dalam memasukkan date
  // Jadi harus dilakukan pengecekan untuk konversi string kosong jadi null
  let playDate;
  if (!req.body.playDate) {
    playDate = null;
  } else {
    playDate = req.body.playDate;
  }

  History.create({
    playDate: req.body.playDate,
    resultGame: req.body.resultGame,
    userId: req.body.userId,
  }).then(() => {
    res.redirect("/history");
  });
});

//REST API 
//REST API USER
//GET
router.get("/api/users", (req, res) => {
  User.findAll({
    order: [["username", "ASC"]],
    include: ["Biodata"],
  })
      .then(users => {
          res.status(200).json(users)
      })
})

// GET by ID
router.get('/api/users/:id', (req, res) => {
  User.findOne({
      include: ["Biodata"],
  }, 
  {
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

//REST API BIODATA
router.get("/api/biodata", (req, res) => {
  Biodata.findAll({
    order: [["firstName", "ASC"]],
    include: ["User"],
  }).then((biodata) => {
    res.json(biodata);
  });
});

// GET by ID
router.get('/api/biodata/:id', (req, res) => {
  Biodata.findOne({
      order: [["firstName", "ASC"]],
      include: ["User"],
  },
  {
      where: { id: req.params.id }
  })
      .then(biodata => {
          res.status(200).json(biodata)
      })
})

//POST

router.post('/api/biodata', (req, res) => {
  Biodata.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthOfDate: req.body.birthOfDate,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    userId: req.body.userId,
  })
      .then(biodata => {
          res.status(201).json(biodata)
      }) .catch(err => {
          res.status(422).json("Tidak bisa menambahkan biodata")
      })
})

//PUT
router.put('/api/biodata/:id', (req, res) => {
  Biodata.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthOfDate: req.body.birthOfDate,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    userId: req.body.userId,
  }, {
      where: { id: req.params.id }
  })
      .then(biodata => {
          res.status(201).json(biodata)
  })  .catch(err => {
          res.status(422).json("Tidak bisa mengubah biodata")
  })
})

//DELETE 
router.delete('/api/biodata/:id', (req, res) => {
  Biodata.destroy({
      where: { id: req.params.id }
  })
      .then(biodata => {
          res.sendStatus(204)
      }) .catch(err => {
          res.status(422).json("Tidak bisa menghapus biodata user")
      })
})

//REST API HISTORY
router.get("/api/history", (req, res) => {
  History.findAll({
    include: ["user"],
  }).then((history) => {
    res.json(history);
  });
});

// GET by ID
router.get('/api/history/:id', (req, res) => {
  History.findOne({
      include: ["user"],
  },
  {
      where: { id: req.params.id }
  })
      .then(history => {
          res.status(200).json(history)
      })
})

//POST

router.post('/api/history', (req, res) => {
  History.create({
    playDate: req.body.playDate,
    resultGame: req.body.resultGame,
    userId: req.body.userId,
  })
      .then(history => {
          res.status(201).json(history)
      }) .catch(err => {
          res.status(422).json("Tidak bisa menambahkan history")
      })
})


module.exports = router;
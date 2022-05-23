const { User } = require("./models");

User.findAll().then((users) => {
    console.log(users);
});

User.findOne({
    where: {
        id: 1,
    },
}).then((user) => {
    console.log(user);
});

const router = require('./api');
const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const moment = require('moment');
var passwordHash = require('password-hash');
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.getRecrods()
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error While getting Bank Details");
  }
});


router.get('/users/:id', async (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(users => {
    if (users) {
      res.json({
        id: users._id,
        designation: users.designation,
        first_name: users.first_name,
        last_name: users.last_name,
        Date_of_birth: users.Date_of_birth,
        Address: users.Address,
        createdOn: users.createdOn,
        updatedOn: users.updateRecrod
      });
    } else {
      res.json({
        error: 'data empty'
      })
    }
  })
    .catch(e => {
      res.status(400).send("Error while getting User Details");
    });

});

router.post('/users', async (req, res, next) => {
  console.log("stating----1---")
  console.log(req);
  if (req.body) {
    console.log("stating-------")
    console.log(req.body)
    const newUser = new User({
      password: req.body.password,
      designation: req.body.designation,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      Date_of_birth: req.body.Date_of_birth,
      Address: req.body.Address,
      createdOn: moment().format("YYYY-MM-DD"),
      updatedOn: moment().format("YYYY-MM-DD")
    });
    newUser
      .save()
      .then(() => res.json({
        success: true,
        user: newUser
      }))
      .catch(err => console.log(err));
  }
 else {
    res.json({
      error: 'The input field is empty'
    })
  }

});



router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.updateRecrod({ '_id': req.params.id }, req.body)
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error While Editing user Details");
  }
})

router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.deleteRecrod({ '_id': req.params.id })
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error While deleting User Details");
  }
})

module.exports = router;

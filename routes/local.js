/* eslint-disable camelcase */
const router = require('./api');
const User = require('../models/user');
var passwordHash = require('password-hash');
router.post('/clogin', function (req, res, next) {
  // eslint-disable-next-line camelcase
  console.log("login psage===")
  const first_name = req.body.first_name;
  const password = req.body.password;
  User.findOne({ first_name }).then(user => {
    if (!user) {
      return res.status(404).json({ first_name: 'This user does not exist' });
    }
    console.log("login psage=1==")
    if (password != user.password) {
      return res.status(404).json('Incorrect Password');
    } else {
      res.json({
        success: true,
        user: {
          first_name: user.first_name,
          userid: user._id,
          designation: user.designation
        }
      });
    }
  })
    .catch(e => {
      res.status(400).send('Error while Login');
    });
});

module.exports = router;

const router = require('./api');
const LeavesDetails = require('../models/leaves');
const User = require('../models/user');
router.get('/allLeaves', async (req, res, next) => {
    try{
        let leaves = null;
       leaves = await LeavesDetails.getRecrods();
       const recordsLength = leaves.length;
      res.json({
          recordsLength,
          leaves
      });
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Error While getting Leave Details" + err);
    }
  });
  router.get('/leaves', async (req, res, next) => {
  try{
      let leaves = null;
      var isConfirmed = false;
     leaves = await LeavesDetails.getRecrods({'isConfirmed':isConfirmed});
     const recordsLength = leaves.length;
    res.json({
        recordsLength,
        leaves
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Error While getting Leave Details" + err);
  }
});

router.get('/leaves/:uid', async (req, res, next) => {
  try{
  const leaves = await LeavesDetails.getRecrods({ 'userid': req.params.uid })
  res.json(leaves);
} catch (err) {
  console.error(err.message);
  res.status(400).send("Error While getting Leave Details" + err);
}
});


router.post('/leaves', async (req, res, next) => {
  let leaves = null;
  const user = await User.findOne({ '_id': req.body.userid });
  if (req.body) {
    try {
        leaves = await LeavesDetails.createRecrod({
        userid: req.body.userid,
        username: user.first_name,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        PhoneNumber: req.body.PhoneNumber,
        LeaveDescription: req.body.LeaveDescription,
      });
      res.json(leaves);
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Error While getting Leave Details" + err);
    }
  } else {
    res.json({
      error: 'The input field is empty'
    })
  }
});

router.put('/leaves/:id', async (req, res, next) => {
    try {
var isConfirmed = true;
      if(req.body){
        LeavesDetails.findById(req.params.id).then(leaves => {
            leaves.isConfirmed = isConfirmed;
            leaves
              .save()
              .then(() => res.json(leaves))
              .catch(err => res.status(400).json(`Error: ${err}`));
          });
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Error While Accept Leave");
    }
  })

module.exports = router;
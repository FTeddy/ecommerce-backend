const User = require('../models/User');

module.exports = {

  signUp: (req,res) => {
    console.log('controller start');
    User.findOne({email: req.body.response.email})
      .exec().then(foundUser => {
        if (foundUser) {
          let data = {
            token:req.token,
            fbData: req.body.response,
            userData: foundUser,
            message:'jwt login succesful'
          }
          return res.status(200).json(data)
        } else {
          let newUser = new User({
            name: req.body.response.name,
            email : req.body.response.email,
          })

          newUser.save((err, createdUser) => {
            if (err) {
              return res.status(500).json({
                message: 'User failed to be created'
              })
            }
            let data = {
              message: 'JWT login succesful',
              token: req.token,
              fbData: req.body.response,
              userData: createdUser,
            }
            return res.status(200).json(data)
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong'
        })
      })
  }

};

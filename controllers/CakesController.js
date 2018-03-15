const Cakes = require('../models/Cakes');
module.exports = {
  index: (req, res) => {
    Cakes.find()
      .limit(30)
      .exec().then(foundCakes => {
        res.status(200).json({
          message: 'found Cakessl data',
          data: foundCakes
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  create : (req, res) => { // need file upload
    let newCakes = new Cakes({
      imgUrl: req.body.cloudStoragePublicUrl,
      title: req.body.title,
      price: req.body.price
    })

    newCakes.save((err,createdCakes)=>{
      if (err) {
        return res.status(500).json({
          message: "Cakes failed to be created"
        })
      }
      return res.status(200).send(data)
    })
  },

  update : (req, res) => { // need file upload
    const id = req.params.id;
    let updateData = {};
    if (req.body.cloudStoragePublicUrl) {updateData.cloudStoragePublicUrl = req.body.cloudStoragePublicUrl}
    if (req.body.title) {updateData.title = req.body.title}
    if (req.body.price) {updateData.price = req.body.price}

    Cakes.findByIdAndUpdate({ _id : id }, updateData, {new: true})
      .exec()
      .then(updatedCakes => {
        res.status(200).json({
          message: 'Successfully updated Cakes data.',
          data : updatedCakes
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  destroy : (req, res) => { // delete gcs data aswell
    const id = req.params.id;
    Cakes.findOneAndRemove({ _id: id})
      .exec()
      .then(Cakes => {
        res.status(200).json({
          message: 'Cakes Successfully removed'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  findOneAndPass : (req, res, next) => {
    const id = req.params.id;
    Cakes.findOne({_id: id})
      .exec()
      .then(foundCake => {
        req.cake = foundCake;
        console.log(req.toDelete);
        next()
      })
  }


};

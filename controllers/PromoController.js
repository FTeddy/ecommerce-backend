const Promo = require('../models/Promo');
module.exports = {
  index: (req, res) => {
    Promo.find()
      .limit(30)
      .exec().then(foundPromo => {
        res.status(200).json({
          message: 'found Promosl data',
          data: foundPromo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  create : (req, res) => { // need file upload
    let newPromo = new Promo({
      imgUrl: req.body.cloudStoragePublicUrl,
      desc: req.body.desc,
      cakesId: req.cakes._id
    })

    newPromo.save((err,createdPromo)=>{
      if (err) {
        return res.status(500).json({
          message: "Promo failed to be created"
        })
      }
      return res.status(200).send(data)
    })
  },

  update : (req, res) => { // need file upload
    const id = req.params.id;
    let updateData = {};
    if (req.body.cloudStoragePublicUrl) {updateData.cloudStoragePublicUrl = req.body.cloudStoragePublicUrl}
    if (req.body.desc) {updateData.desc = req.body.desc}
    if (req.body.cakesId) {updateData.cakesId = req.body.cakesId}

    Promo.findByIdAndUpdate({ _id : id }, updateData, {new: true})
      .exec()
      .then(updatedPromo => {
        res.status(200).json({
          message: 'Successfully updated Promo data.',
          data : updatedPromo
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
    Promo.findOneAndRemove({ _id: id})
      .exec()
      .then(Promo => {
        res.status(200).json({
          message: 'Promo Successfully removed'
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
    Promo.findOne({_id: id})
      .exec()
      .then(foundPromo => {
        req.toDelete = foundPromo;
        console.log(req.toDelete);
        next()
      })
  }

};

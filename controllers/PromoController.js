const Promo = require('../models/Promo');
module.exports = {
  index: (req, res) => {
    Promo.find()
      .limit(30)
      .exec().then(foundPromo => {
        res.status(200).json({
          message: 'found Promos data',
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
    console.log('start promo controller');
    console.log(req.body);
    let newPromo = new Promo({
      imgUrl: req.file.cloudStoragePublicUrl,
      desc: req.body.desc,
    })
    console.log('==============================1111');
    newPromo.save((err,createdPromo)=>{
      if (err) {
        return res.status(500).json({
          message: "Promo failed to be created"
        })
      }
      return res.status(200).json({
        message: 'Successfully added new Promo',
        data: createdPromo
      })
    })
  },

  update : (req, res) => { // need file upload
    const id = req.params.id;
    let updateData = {};
    if (req.file.cloudStoragePublicUrl) {updateData.imgUrl = req.file.cloudStoragePublicUrl}
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

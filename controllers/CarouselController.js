const Carousel = require('../models/Carousel');
module.exports = {
  index: (req, res) => {
    Carousel.find()
      .limit(30)
      .exec().then(foundCarousel => {
        res.status(200).json({
          message: 'found carouselsl data',
          data: foundCarousel
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  create : (req, res) => { // need file upload
    let newCarousel = new Carousel({
      imgUrl: req.file.cloudStoragePublicUrl,
      class: req.body.class
    })

    newCarousel.save((err,createdCarousel)=>{
      if (err) {
        return res.status(500).json({
          message: "Carousel failed to be created"
        })
      }
      return res.status(200).json({
        message: 'Successfully added new carousel',
        data: createdCarousel
      })
    })
  },

  update : (req, res) => { // need file upload
    const id = req.params.id;
    let updateData = {};
    if (req.body.cloudStoragePublicUrl) {updateData.imgUrl = req.body.imgUrl}
    if (req.body.class) {updateData.class = req.body.class}

    Carousel.findByIdAndUpdate({ _id : id }, updateData, {new: true})
      .exec()
      .then(updatedCarousel => {
        res.status(200).json({
          message: 'Successfully updated Carousel data.',
          data : updatedCarousel
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
    // console.log(req.toDelete);
    Carousel.findOneAndRemove({ _id: id})
      .exec()
      .then(Carousel => {
        res.status(200).json({
          message: 'Carousel Successfully removed'
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
    Carousel.findOne({_id: id})
      .exec()
      .then(foundCarousel => {
        req.toDelete = foundCarousel;
        console.log(req.toDelete);
        next()
      })
  }

};

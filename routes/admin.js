const express = require('express');
const router = express.Router();
const CarouselController = require('../controllers/CarouselController');
const PromoController = require('../controllers/PromoController');
const CakesController = require('../controllers/CakesController');
const memUpload = require('../middleware/multer.js');
const {googleUpload, googleDelete} = require('../middleware/g-cloud-upload.js');

/* GET home page. */
router.get(   '/carousel', CarouselController.index)
router.post(  '/carousel/add', memUpload.single('carousel'), googleUpload, CarouselController.create)
router.put(   '/carousel/edit/:id', memUpload.single('carousel'), googleUpload, CarouselController.update)
router.delete('/carousel/delete/:id',CarouselController.findOneAndPass, googleDelete ,CarouselController.destroy)
//
router.get(   '/promo', PromoController.index)
router.post(  '/promo/add', memUpload.single('promo'), googleUpload, PromoController.create)
router.put(   '/promo/edit/:id', memUpload.single('promo'), googleUpload, PromoController.update)
router.delete('/promo/delete/:id', PromoController.destroy)

router.get(   '/cakes', CakesController.index)
router.post(  '/cakes/add', memUpload.single('cakes'), googleUpload, CakesController.create)
router.put(   '/cakes/edit/:id', memUpload.single('cakes'), googleUpload, CakesController.update)
router.delete('/cakes/delete/:id', CakesController.destroy)

module.exports = router;

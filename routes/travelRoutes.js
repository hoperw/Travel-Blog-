const express = require('express')
const travelController = require('../controllers/travelController')

const router = express.Router();


router.use(express.static('assets'))

router
    .route('/')
    .get(travelController.getAllTravels)

router
    .route('/map')
    .get(travelController.map)

router
    .route('/all-countries')
    .get(travelController.allCountries)

router
    .route('/:id')
    .get(travelController.getBlog)
    
router
    .route('/:id/comment')
    .patch(travelController.writeComment)



module.exports = router;
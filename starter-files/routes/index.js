const express = require('express');
const router = express.Router();
const storeController = require("../controllers/storeController")
const {catchErrors} = require('../handlers/errorHandlers')

//gets
router.get('/', catchErrors(storeController.getStores))
router.get('/stores', catchErrors(storeController.getStores))
router.get('/add', storeController.addStore)
router.get('/stores/:id/edit', catchErrors(storeController.editStore))
router.get('/stores/:slug', catchErrors(storeController.getStoreBySlug))

//post/update
router.post('/add', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));
router.post('/add/:id', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore));

    
module.exports = router;

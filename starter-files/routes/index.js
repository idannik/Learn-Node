const express = require('express');
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const {catchErrors} = require('../handlers/errorHandlers');


//gets
router.get('/', catchErrors(storeController.getStores))
router.get('/stores', catchErrors(storeController.getStores))

router.get('/add', authController.isLoggedIn,
                    storeController.addStore)

router.get('/stores/:id/edit', catchErrors(storeController.editStore))
router.get('/stores/:slug', catchErrors(storeController.getStoreBySlug))

router.get('/tags/', catchErrors(storeController.getStoresByTag))
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag))

router.get("/login", userController.loginForm);
router.get("/register", userController.registerForm);
router.get('/logout', authController.logout)

router.get('/account', userController.account)

//post/update

router.post("/register", 
    userController.validateRegister,
    userController.register,
    authController.login);


router.post('/add', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));

router.post('/add/:id', 
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore));

router.post('/login', authController.login)    

router.post('/account', authController.isLoggedIn,
                        catchErrors(userController.updateAccount))

module.exports = router;

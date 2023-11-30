var express = require('express');
const tablets = require('../models/tablets');
var router = express.Router();
const tabletController = require('../controllers/tablets')

// Auth
// helper method
let mongoose = require('mongoose');
function requireAuth(req,res,next){
    if(!req.isAuthenticated)
    {
        return res.redirect('/login');
    }
    next();
}

// CRUD --> Create, Read, Update, Delete

// Get router for Read Operation
router.get('/', tabletController.ReadTabletData)

// Get router for Create operation --> display the add book page
router.get('/add', requireAuth, tabletController.AddTablet)

// Post router for Create operation --> process the add book page
router.post('/add', requireAuth, tabletController.ProcessAddTablet)

// Get router for Edit/Update operation --> display the edit book page
router.get('/edit/:id', requireAuth, tabletController.EditTabletPage)

// Post router for Edit/Update operation --> process the edit book page
router.post('/edit/:id', requireAuth, tabletController.ProcessEditPage)

// Get router for Delete operation
router.get('/delete/:id', requireAuth, tabletController.DeleteTablet)

module.exports = router;
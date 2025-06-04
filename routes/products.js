const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authentication } = require('../middleware/authentication');

router.post('/', ProductController.insert)
router.get("/", ProductController.getAll)
//router.put("/:id", ProductController.update)
router.put("/id/:id",authentication, ProductController.update)
router.delete("/id/:id",authentication, ProductController.delete)
router.get("/id/:id", ProductController.getById)
router.get("/name/:name", ProductController.getOneByName)
router.get('/price/asc', ProductController.getAllOrderedByPriceAsc)









module.exports = router;
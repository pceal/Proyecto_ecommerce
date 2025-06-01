const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/',ProductController.insert)
router.get("/", ProductController.getAll)
//router.put("/:id", ProductController.update)
router.put("/id/:id", ProductController.update)
router.delete("/id/:id", ProductController.delete)
router.get("/id/:id", ProductController.getById)
router.get("/name/:name", ProductController.getOneByName)
router.get('/price/asc', ProductController.getAllOrderedByPriceAsc)









module.exports = router;
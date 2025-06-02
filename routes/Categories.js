const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController")


router.post("/", CategoryController.create)
router.get("/", CategoryController.getAll)
router.put("/id/:id", CategoryController.update)
router.delete("/id/:id", CategoryController.delete)
router.get("/id/:id", CategoryController.getById)
router.get("/name/:name", CategoryController.getOneByName)

//router.get("/id/:id", OrderController.getById)
//router.get("/number/:number", OrderController.getOneByNumber)



module.exports = router;

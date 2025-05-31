const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController")


router.post("/", OrderController.create)
router.get("/", OrderController.getAll)
//router.get("/id/:id", OrderController.getById)
//router.get("/number/:number", OrderController.getOneByNumber)



module.exports = router;
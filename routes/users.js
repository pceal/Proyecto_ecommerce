const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")


router.post("/", UserController.create)
// AÑADIR B router.post("/login", UserController.login)
router.get("/", UserController.getAll)
router.put("/id/:id", UserController.update)


module.exports = router;
const express = require("express")
const UserController = require("../controllers/UserController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()


router.post("/", UserController.create)
router.post("/login", UserController.login)
router.get("/", UserController.getAll)
router.put("/:id", authentication, UserController.update)
router.delete("/logout", authentication, UserController.logout)



module.exports = router;
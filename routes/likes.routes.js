const express = require("express")
const router = express.Router()
const likesController = require("../controllers/likes.controller")
const {verifyToken} = require("../middlewares/http/auth.middleware")

router.post("/",verifyToken,likesController.addLike)
router.get("/:id",verifyToken,likesController.getLikesByIdPublicacion)
router.delete("/:id",verifyToken,likesController.deleteFisicoById)
module.exports = router
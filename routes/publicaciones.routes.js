const express = require("express")
const router = express.Router()

const publicacionesController = require("../controllers/publicaciones.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/",authMiddleware.verifyToken,publicacionesController.postPublicaciones)

module.exports = router
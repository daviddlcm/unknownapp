const express = require("express")
const router = express.Router()

const publicacionesController = require("../controllers/publicaciones.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/",authMiddleware.verifyToken,publicacionesController.postPublicaciones)
router.get("/",authMiddleware.verifyToken,publicacionesController.getPublicaciones)
router.get("/nuevas",authMiddleware.verifyToken,publicacionesController.getNuevasPublicaciones)
module.exports = router
const express = require("express")
const router = express.Router()

const comentariosController = require("../controllers/comentarios.controller")
const {verifyToken} = require("../middlewares/auth.middleware")

router.post("/:id",verifyToken,comentariosController.addComment)
router.get("/:id",comentariosController.getCommentByIdUnique)
router.get("/publicacion/:id",comentariosController.getCommentsByPublicationById)




module.exports = router
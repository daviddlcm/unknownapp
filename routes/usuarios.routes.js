const express = require('express');
const router = express.Router();

const usuariosRouter = require("../controllers/usuarios.controller")
const {verifyToken} = require("../middlewares/http/auth.middleware")

router.post("/",usuariosRouter.postUsuario)
router.get("/:id",usuariosRouter.getUsuarioById)
router.post("/login",usuariosRouter.login)
router.get("/",verifyToken,usuariosRouter.getMe)
module.exports = router;
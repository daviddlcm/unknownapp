const express = require('express');
const router = express.Router();

const usuariosRouter = require("../controllers/usuarios.controller")

router.post("/",usuariosRouter.postUsuario)
router.get("/:id",usuariosRouter.getUsuarioById)
router.post("/login",usuariosRouter.login)
module.exports = router;
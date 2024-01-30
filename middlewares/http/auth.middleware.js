require("dotenv").config()
const Usuario = require("../../models/usuarios.model")
const jwt = require("jsonwebtoken")
const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["token"]
    if(!token){
        return res.status(401).json({
            message:"no se proporciono un token"
        })
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    
    const usuarioId = await Usuario.getUsuarioById(decoded.id)
    if(!usuarioId){
        return res.status(404).json({
            message:"usuario no encontrado"
        })
    }
    req.user = usuarioId.id_usuario
    next()
    }catch(error){
        return res.status(500).json({
            message:"no se pudo verificar el token",
            error:error.message
        })
    }
}

module.exports = {verifyToken}
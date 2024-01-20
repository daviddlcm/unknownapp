require("dotenv").config()
const Usuario = require("../models/usuarios.model")
const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"]
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
    console.log("el usuario es: " + usuarioId.nombre)
    next()
    }catch(error){
        return res.status(500).json({
            message:"no se pudo verificar el token",
            error:error.message
        })
    }

}

module.exports = {verifyToken}
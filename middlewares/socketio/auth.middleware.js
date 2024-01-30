require("dotenv").config()
const Usuario = require("../../models/usuarios.model")
const jwt = require("jsonwebtoken")
const verifyToken = async (socket,next) => {
    try{
        const token = socket.handshake.auth.token
    if(!token){
        data = {
            message:"no se proporciono un token"
        }
        socket.emit("auth:error",data)
        return
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    
    const usuarioId = await Usuario.getUsuarioById(decoded.id)
    
    socket.user = usuarioId.id_usuario
    next()
    }catch(error){
        data = {
            message:"no se pudo verificar el token",
            error:error.message
        }
        socket.emit("auth:error",data)
    }
}

module.exports = {verifyToken}
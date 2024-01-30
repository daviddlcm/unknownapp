require("dotenv").config()
const Usuario = require("../models/usuarios.model")
const bcrypt = require("bcrypt")
const salt = parseInt(process.env.SALTOS)
const jwt = require("jsonwebtoken")
const postUsuario = async (req,res) => {
    try{
        const usuario = new Usuario({
            nombre:req.body.nombre,
            correo:req.body.correo,
            password:bcrypt.hashSync(req.body.password,salt)
        })

        await usuario.save()

        return res.status(201).json({
            message:"usuario agregado",
            usuario:usuario
        })
    }catch(error){
        return res.status(500).json({
            message:"no se puedo agregar el usuario",
            error:error.message
        })
    }
}

const getUsuarioById = async (req,res) => {
    try{
        const usuario = await Usuario.getUsuarioById(req.params.id)
        
        if(!usuario){ 
        return res.status(404).json({
            message:"usuario no encontrado"
        })
        }
        return res.status(200).json({
            message:"usuario encontrado",
            usuario:usuario
        })
    }catch(error){
        return res.status(500).json({
            message:"no se puedo obtener el usuario",
            error:error.message
        })
    }
}

const login = async (req,res) =>{
    try{
    const {correo,password} = req.body
    const usuarioEncontrado = await Usuario.getByCorreo(correo)
    if(!usuarioEncontrado){
        return res.status(404).json({
            message:"usuario o password incorrectos"
    })
    }
    if(!bcrypt.compareSync(password,usuarioEncontrado.password)){
        return res.status(401).json({
            message:"usuario o password incorrectos"
        })
    }
    const id = usuarioEncontrado.id_usuario
    const token = jwt.sign({id:id},process.env.SECRET_KEY,{expiresIn:"2h"})
    
    return res.status(200).json({
        message:"bienvenido",
        token:token
    })
    }catch(error){
        return res.status(500).json({
            message:"no se puedo obtener el usuario",
            error:error.message
        })
    }
}

module.exports = {
    postUsuario,
    getUsuarioById,
    login,
}
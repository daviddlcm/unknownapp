const Publicacion = require("../models/publicaciones.model")
const postPublicaciones = async (req,res) => {
    try{
        const publicacion = new Publicacion({
            id_usuario:req.user,
            texto:req.body.texto,
            createdBy:req.user
        })
        await publicacion.save()
        return res.status(201).json({
            message:"publicacion guardada con exito",
            data:publicacion
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo guardar la publicacion",
            error:error.message
        })
    }
}

module.exports = {
    postPublicaciones
}
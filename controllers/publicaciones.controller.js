const Publicacion = require("../models/publicaciones.model")

let responsesClientes = [];

const postPublicaciones = async (req,res) => {
    try{
        const publicacion = new Publicacion({
            id_usuario:req.user,
            texto:req.body.texto,
            createdBy:req.user
        })
        await publicacion.save()
        responderNotificacion(publicacion)

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

const getPublicaciones = async (req,res) => {
    try{
        const publicaciones = await Publicacion.getPublicaciones()
        return res.status(200).json({
            message:"publicaciones obtenidas con exito",
            data:publicaciones
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo obtener las publicaciones",
            error:error.message
        })
    }
}

function responderNotificacion(notificacion) {
    for (res of responsesClientes) {
        res.status(200).json({
            success: true,
            notificacion
        });
    }

    responsesClientes = [];
}

const getNuevasPublicaciones = (req, res) => {
    responsesClientes.push(res);
    req.on('close', () => {
        const index = responsesClientes.indexOf(res);
        if (index !== -1) {
            responsesClientes.splice(index, 1);
            res.end(); 
        }
    });
}

module.exports = {
    postPublicaciones,
    getPublicaciones,
    getNuevasPublicaciones
}
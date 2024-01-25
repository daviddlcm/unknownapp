const Likes = require('../models/likes.model');

const addLike = async (req,res) => {
    try{
        const like = new Likes({
            id_publicacion:req.body.id_publicacion,
            id_usuario:req.user,
            created_by:req.user,
        })
        like.save()
        return res.status(201).json({
            message:"Like agregado correctamente",
            like:like,
            succes:true
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al agregar el like",
            error:error.message,
            succes:false
        })
    }
}

const getLikesByIdPublicacion = async (req,res) => {
    try{
        const likes = await Likes.getAllByIdPublicacion(req.params.id)
        if(likes.length == 0){
            return res.status(404).json({
                message:"No se encontraron likes",
                succes:false
            })
        }
        return res.status(200).json({
            message:"Likes obtenidos correctamente",
            likes:likes,
            succes:true
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al obtener los likes",
            error:error.message,
            succes:false
        })
    }
}
const deleteFisicoById = async (req,res) => {
    try{
        await Likes.deletedFisico(req.params.id)
        return res.status(200).json({
            message:"Like eliminado correctamente",
            succes:true
        })
    }catch(error){
        return res.status(500).json({
            message:"Error al eliminar el like",
            error:error.message,
            succes:false
        })
    }
}

module.exports = {
    addLike,
    getLikesByIdPublicacion,
    deleteFisicoById
}
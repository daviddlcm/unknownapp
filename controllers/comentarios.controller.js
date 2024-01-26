const Comentario = require("../models/comentarios.model")

const addComment = async (req,res) => {
    try{
        const publicacion = new Comentario ({
            id_publicacion:req.params.id,
            comentario:req.body.comentario,
            id_usuario:req.user,
            created_by:req.user
        })
        publicacion.save()
        return res.status(201).json({
            message:"comentario guardado con exito",
            data:publicacion,
            success:true
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo guardar el comentario",
            error:error.message,
            success:false
        })
    }

}
const getCommentByIdUnique = async (req,res) => {
    try{
        const comentarios = await Comentario.getComentarioById(req.params.id)
        if(!comentarios){
            return res.status(404).json({
                message:"no se encontro el comentario",
                success:false
            })
        }
        return res.status(200).json({
            message:"comentario encontrado",
            data:comentarios,
            success:true
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo guardar el comentario",
            error:error.message,
            success:false
        })
    }
}
const getCommentsByPublicationById = async (req,res) => {
    try{
        const comentarios = await Comentario.getCommentsByPublication(req.params.id)

        if(comentarios.length == 0){
            return res.status(404).json({
                message:"no se encontraron los comentarios",
                success:false
            })
        }
        return res.status(200).json({
            message:"comentarios encontrados",
            data:comentarios,
            success:true
        })
    }catch(error){
        return res.status(500).json({
            message:"no se pudo ver los comentarios",
            error:error.message,
            success:false
        })
    }
}
module.exports = {
    addComment,
    getCommentByIdUnique,
    getCommentsByPublicationById
}
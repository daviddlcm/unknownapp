const Comentario = require("../models/comentarios.model")

module.exports = (io,socket) => {
    const addComment = async (data) => {
        try{
            const publicacion = new Comentario ({
                id_publicacion:data.id_publicacion,
                comentario:data.comentario,
                id_usuario:socket.user,
                created_by:socket.user
            })
            publicacion.save()

            socket.emit("comentario:creado",publicacion)
            io.emit("comentario:creado",publicacion)


        }catch(error){
            const data = {
                message:"no se pudo guardar el comentario",
                error:error.message,
            }
            socket.emit("comenatario:error al crear",data)
        }
    
    }
    // const getCommentByIdUnique = async (req,res) => {
    //     try{
    //         const comentarios = await Comentario.getComentarioById(req.params.id)
            
    //         socket.emit("comentario:verUnComentario_succes",comentarios)

    //     }catch(error){
    //         const data = {
    //             message:"no se pudo obtener el comentario",
    //             error:error.message,
    //         }
    //         socket.emit("comentario:verUnComentario_error",data)
    //     }
    // }
    const getCommentsByPublicationById = async (id) => {
        try{
            const comentarios = await Comentario.getCommentsByPublication(id)
    
            socket.emit("comentario:verTodosDeUnaPublicacion_succes",comentarios)
            //io.emit("comentario:verTodosDeUnaPublicacion_succes",comentarios)
        }catch(error){
            const data = {
                message:"no se pudo guardar el comentario",
                error:error.message,
            }
            socket.emit("comentario:verTodosDeUnaPublicacion_error",data)
        }
    }
    socket.on("comentario:crear",addComment)
    // socket.on("comentario:verUnComenataro",getCommentByIdUnique)
    socket.on("comentario:verTodosDeUnaPublicacion",getCommentsByPublicationById)
}
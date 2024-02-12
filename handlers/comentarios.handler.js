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

            io.emit("comentario:creado",publicacion)
            socket.emit("comentario:creado",publicacion)
            


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
            //console.log(comentarios)
            if(comentarios.length == 0){
                const data = {
                    message:"no hay comentarios",
                    error:"no hay comentarios",
                    idPublicacion: id
                }
                socket.emit("comentario:verTodosDeUnaPublicacion_error",data)
                return
            }
            //socket.emit("comentario:verTodosDeUnaPublicacion_succes",{comentarios, idPublicacion: id})
            io.emit("comentario:verTodosDeUnaPublicacion_succes",{comentarios, idPublicacion: id})
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

    socket.on("joinRoom",(idRoom,usuario) => {
        socket.join(idRoom)
        socket.emit("whoJoin",usuario,idRoom)
    })
    
}
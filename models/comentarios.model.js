const db = require("../configs/db.config")
class Comentario{
    constructor({id_comentario,id_publicacion,comentario,id_usuario,created_by,created_at,updated_at,updated_by,deleted_by,deleted_at,deleted}){
        this.id_comentario = id_comentario
        this.id_publicacion = id_publicacion
        this.comentario = comentario
        this.id_usuario = id_usuario
        this.created_by = created_by
        this.created_at = created_at
        this.updated_at = updated_at
        this.updated_by = updated_by
        this.deleted_by = deleted_by
        this.deleted_at = deleted_at
        this.deleted = deleted
    }

    async save(){
        const connection = await db.createConnection()

        const createdAt = new Date()

        const [result] = await connection.execute("INSERT INTO comentarios (id_publicacion,comentarios,id_usuario,created_by,created_at) VALUES (?,?,?,?,?)",[this.id_publicacion,this.comentario,this.id_usuario,this.created_by,createdAt])
    
        connection.end()

        if(result.insertId == 0){
            throw new Error("no se pudo guardar el comentario")
        }
        this.id_comentario = result.insertId
    }
    static async getComentarioById(id){
        const connection = await db.createConnection()
        const [rows] = await connection.query("SELECT id_comentarios,id_publicacion,comentarios,id_usuario,created_by,created_at,updated_at,updated_by,deleted_by,deleted_at,deleted FROM comentarios WHERE id_comentarios = ?",[id])
        connection.end()
        if(rows.length > 0){
            const row = rows[0]
            return new Comentario({
                id_comentario:row.id_comentarios,
                id_publicacion:row.id_publicacion,
                comentario:row.comentarios,
                id_usuario:row.id_usuario,
                created_by:row.created_by,
                created_at:row.created_at,
                updated_at:row.updated_at,
                updated_by:row.updated_by,
                deleted_by:row.deleted_by,
                deleted_at:row.deleted_at,
                deleted:row.deleted
            })
        }
        return null
    }
    static async getCommentsByPublication(id){
        const connection = await db.createConnection()
        const [rows] = await connection.query("SELECT id_comentarios,id_publicacion,comentarios,id_usuario,created_by,created_at,updated_at,updated_by,deleted_by,deleted_at,deleted FROM comentarios WHERE id_publicacion = ?",[id])
        connection.end()
        return rows
    }
    static async numberCommentsOfPublication(id){
        const connection = await db.createConnection()
        const [rows] = await connection.query("SELECT COUNT(id_comentarios) as number FROM comentarios WHERE id_publicacion = ?",[id])
        connection.end()
        return rows[0].number
    }
}
module.exports = Comentario

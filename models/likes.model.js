const db = require("../configs/db.config")
class Like{
    constructor({id_likes,id_publicacion,id_usuario,created_by,created_at,updated_by,updated_at,deleted_by,deleted_at,deleted}){
        this.id_likes = id_likes;
        this.id_publicacion = id_publicacion;
        this.id_usuario = id_usuario;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_by = updated_by;
        this.updated_at = updated_at;
        this.deleted_by = deleted_by;
        this.deleted_at = deleted_at;
        this.deleted = deleted;
    }
    async save(){
        const connection = await db.createConnection()
        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO likes (id_publicacion,id_usuario,created_by,created_at) VALUES(?,?,?,?)",[this.id_publicacion,this.id_usuario,this.created_by,createdAt])
        connection.end()
        
        if(result.insertId == 0){
            throw new Error("No se pudo guardar el like")
        }
        this.id_likes = result.insertId
    }
    static async getAllByIdPublicacion(id_publicacion){
        const connection = await db.createConnection()
        const [rows] = await connection.query("SELECT id_likes,id_publicacion,id_usuario,created_by,created_at,updated_by,updated_at,deleted_by,deleted_at,deleted FROM likes WHERE id_publicacion = ?",[id_publicacion])
        connection.end()
        return rows
    }
    static async deletedFisico(id_likes){
        const connection = await db.createConnection()
        const [result] = await connection.execute("DELETE FROM likes WHERE id_likes = ?",[id_likes])
        connection.end()
        if(result.affectedRows == 0){
            throw new Error("No se pudo eliminar el like")
        }
    }
}
module.exports = Like
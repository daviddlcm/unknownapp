const db = require("../configs/db.config")
class Publicacion{
    constructor({id_publicacion,id_usuario,texto,createdAt,createdBy,updateBy,updateAt,deletedBy,deletedAt,deleted}){
        this.id_publicacion = id_publicacion;
        this.id_usuario = id_usuario;
        this.texto = texto;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.deletedAt = deletedAt;
        this.deleted = deleted;
        this.createdBy = createdBy;
        this.updateBy = updateBy;
        this.deletedBy = deletedBy;
    }
    async save(){
        const connection = await db.createConnection()
        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO publicaciones (id_usuario,texto,created_at,created_by) VALUES (?,?,?,?)",[this.id_usuario,this.texto,createdAt,this.createdBy])
        connection.end()

        if(result.insertId == 0){
            throw new Error("No se pudo guardar la publicacion")
        }
        this.id_publicacion = result.insertId
    }
}
module.exports = Publicacion
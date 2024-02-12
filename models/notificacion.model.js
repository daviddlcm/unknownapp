const db = require("../configs/db.config")
class Notificacion{
    constructor({id_notificacion,mensaje,id_usuario_notifico,id_usuario_notificado,id_publicacion,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by,deleted}){
        this.id_notificacion = id_notificacion;
        this.mensaje = mensaje;
        this.id_usuario_notifico = id_usuario_notifico;
        this.id_usuario_notificado = id_usuario_notificado;
        this.id_publicacion = id_publicacion;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
        this.deleted_at = deleted_at;
        this.deleted_by = deleted_by;
        this.deleted = deleted;
    }
    async save(){
        const connection = await db.createConnection()

        const created_at = new Date()
        const [result] = await connection.execute("INSERT INTO notificacion (mensaje,id_usuario_notifico,id_usuario_notificado,id_publicacion,created_at,created_by) VALUES (?,?,?,?,?,?)",[this.mensaje,this.id_usuario_notifico,this.id_usuario_notificado,this.id_publicacion,created_at,this.created_by])

        connection.end()

        if(result.insertId == 0){
            throw new Error("No se pudo crear la notificacion")
        }
        this.id_notificacion = result.insertId
    }
}
module.exports = Notificacion
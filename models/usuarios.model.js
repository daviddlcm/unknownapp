require("dotenv").config()
const db = require("../configs/db.config")
class Usuario{
    constructor({id_usuario,nombre,correo,password,createdAt,updateAt,deletedAt,deleted}){
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.deletedAt = deletedAt;
        this.deleted = deleted;
    }

    async save(){
        const connection = await db.createConnection()

        const createdAt = new Date()
        const [result] = await connection.execute("INSERT INTO usuarios (nombre,correo,password,created_at) VALUES (?,?,?,?)",[this.nombre,this.correo,this.password,createdAt])
        
        connection.end()

        if(result.insertId == 0){
            throw new Error("No se pudo guardar el usuario")
        }
        this.id_usuario = result.insertId
    }
    static async getUsuarioById(id){
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_usuario,nombre,password,correo,created_at,updated_at,deleted_at,deleted FROM usuarios WHERE id_usuario = ?",[id])
        connection.end()
        if(rows.length > 0){
            const row = rows[0]
            return new Usuario({
                id_usuario:row.id_usuario,
                nombre:row.nombre,
                correo:row.correo,
                password:row.password,
                createdAt:row.created_at,
                updateAt:row.updated_at,
                deletedAt:row.deleted_at,
                deleted:row.deleted
            })
        }
        return null
    }
    static async getByCorreo(correo){
        const connection = await db.createConnection()
        const [rows] = await connection.execute("SELECT id_usuario,nombre,correo,password,created_at,updated_at,deleted_at,deleted FROM usuarios WHERE correo = ?",[correo])
        connection.end()
        if(rows.length > 0){
            const row = rows[0]
            return new Usuario({
                id_usuario:row.id_usuario,
                nombre:row.nombre,
                correo:row.correo,
                password:row.password,
                createdAt:row.created_at,
                updateAt:row.updated_at,
                deletedAt:row.deleted_at,
                deleted:row.deleted
            })
        }
        return null
    }
}
module.exports = Usuario
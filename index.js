require("dotenv").config()
const expres = require('express');
const app = expres();
const PORT = process.env.PORT || 8080;


const {createServer} = require("http")
const {Server} = require("socket.io")

const cors = require("cors")


const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173"
    },
    pingInterval:1000,
    pingTimeout:2000,
})


app.use(expres.json())
app.use(cors())

const authMiddleware = require("./middlewares/socketio/auth.middleware")
io.use(authMiddleware.verifyToken)


const registerCommentsHandler = require("./handlers/comentarios.handler")

const onConnection = (socket) => {
    registerCommentsHandler(io,socket)
}

io.on("connection",onConnection)


const usuariosRouter = require("./routes/usuarios.routes")
const publicacionesRouter = require("./routes/publicaciones.routes")
const likesRouter = require("./routes/likes.routes")
const comentariosRouter = require("./routes/comentarios.routes")

app.use("/usuarios",usuariosRouter)
app.use("/publicaciones",publicacionesRouter)
app.use("/likes",likesRouter)
app.use("/comentarios",comentariosRouter)


httpServer.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
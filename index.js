require("dotenv").config()
const expres = require('express');
const app = expres();
const PORT = process.env.PORT || 8080;
const cors = require("cors")

app.use(expres.json())
app.use(cors())


const usuariosRouter = require("./routes/usuarios.routes")
const publicacionesRouter = require("./routes/publicaciones.routes")
const likesRouter = require("./routes/likes.routes")
const comentariosRouter = require("./routes/comentarios.routes")

app.use("/usuarios",usuariosRouter)
app.use("/publicaciones",publicacionesRouter)
app.use("/likes",likesRouter)
app.use("/comentarios",comentariosRouter)

app.listen(PORT, () => {
    console.log("server listen on port "+PORT)
})
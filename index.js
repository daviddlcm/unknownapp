require("dotenv").config()
const expres = require('express');
const app = expres();
const PORT = process.env.PORT || 8080;

app.use(expres.json())

const usuariosRouter = require("./routes/usuarios.routes")

app.use("/usuarios",usuariosRouter)


app.listen(PORT, () => {
    console.log("server listen on port "+PORT)
})
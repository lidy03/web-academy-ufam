const express = require("express")
const dotenv = require("dotenv")

dotenv.config({ quiet: true })


const app = express()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Olá, mundo!")
})

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});
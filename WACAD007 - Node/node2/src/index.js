import http from "http"
import fs from "fs"
import dotenv from "dotenv"
import { createLink } from "./utils/links.js"

dotenv.config({ quiet: true, path: `${process.cwd()}/.env.${process.env.NODE_ENV}`})

const FOLDER = process.argv[2]
const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })

    if(req.url === "/"){
    fs.readdir(`${process.cwd()}/${FOLDER}`, (err, files) => {
        if (err) {
            return res.end("Não foi possível encontrar o diretório")
        }
        files.forEach(f => res.write((createLink(f))))
        res.end()
    })
    
    } else {
        if(req.url === "/favicon.ico") return res.end()
        fs.readFile(`${process.cwd()}/public${req.url}`, "utf-8", (err, content) => {
            if(err){
                return res.end("Não foi possível encontrar o arquivo")
            }
            res.write(`<a href="/">Voltar</a><br><br>`)
            res.end(content)
        })
    }
})

server.listen(PORT)
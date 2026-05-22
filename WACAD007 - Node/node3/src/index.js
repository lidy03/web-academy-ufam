import fs from "fs/promises"
import http from "http"
import dotenv from "dotenv"
import { loremIpsum } from "lorem-ipsum";

dotenv.config({ quiet: true, path: `${process.cwd()}/.env.${process.env.NODE_ENV}`})

const PORT = process.env.PORT

const server = http.createServer(async(req, res) => {
    
    if(req.url === '/') {
        res.writeHead(200, {"content-type": "text/html;charset=utf-8" })
        const partial1 = await fs.readFile('public/html/partial1.html')
        const partial2 = await fs.readFile('public/html/partial2.html')
        res.write(partial1)
        res.write(partial2)
        res.end()
    } else if(req.url.startsWith('/lorem')) {
        const url = new URL(req.url, `http://localhost:${PORT}`)
        const qtd = parseInt(url.searchParams.get('qtd'))
        res.writeHead(200, {"content-type": "text/html;charset=utf-8" })
        const partial1 = await fs.readFile('public/html/partial1.html', 'utf-8')
        const lorem = loremIpsum({
            count: qtd,                
            format: "html",         
            paragraphLowerBound: 3,  
            paragraphUpperBound: 7,  
            random: Math.random,     
            sentenceLowerBound: 5,   
            sentenceUpperBound: 15,  
            suffix: "\n",            
            units: "paragraphs",      
        });
        const partial2 = await fs.readFile('public/html/partial2.html')
        res.write(partial1)
        res.write(lorem)
        res.write(partial2)
        res.end()
    } else if (req.url === '/style.css') {
        const css = await fs.readFile('public/css/style.css')
        res.write(css)
        res.end()
    } else {
        res.end()
    }
})

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
import type { Request, Response } from "express"
import { loremIpsum } from "lorem-ipsum"

const index = (req: Request, res: Response) => {
  res.send('Hello World!')
}

const about = (req: Request, res: Response) => {
  res.send('Página about')
}

const welcome = (req: Request, res: Response) =>{
  const nome = req.params.nome
  res.send(`Seja bem vindo(a), ${nome}`)
}

const loremipsum = (req: Request, res: Response) =>{
    const qtd = Number(req.params.qtd)
    const texto = loremIpsum ({
        count: qtd,
        units: "paragraphs",
        format: "html"
    })

    res.send(texto)
}

const hb1 = (req: Request, res: Response) => {
    const message = "Bem-vindo(a) ao Web-academy"
    res.render("main/hb1", { 
        message
    })
}

const hb2 = (req: Request, res: Response) => {
    const message = "Bem-vindo(a) ao Web-academy"
    res.render("main/hb2", {
        showMessage: true,
        message
    })
}

const hb3 = (req: Request, res: Response) => {
    const profs = [
        { name: "Passito", room: 2132}, 
        { name: "Eduardo Souto", room: 2138}, 
        { name: "Elaine", room: 2113}, 
    ]
    res.render("main/hb3", {
        profs
    })
}

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render("main/hb4", {
        technologies
    })
}

export default { index, about, welcome, loremipsum, hb1, hb2, hb3, hb4}

interface Tech{
    name: string
    type: string
    poweredByNodejs: boolean
}

function listTechs(techs: Tech[]) {
    const list = techs.filter(t => t.poweredByNodejs).map(t => `<li>${t.name} - ${t.type}</li>`).join("")
    return `<ul>${list}</ul>`

}

export default { listTechs }
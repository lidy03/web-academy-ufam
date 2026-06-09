import express from 'express'
import router from './router/router.js'
import getEnv from './utils/getEnv.js'
import logger from './middleware/logger.js'
import { engine } from 'express-handlebars'
import helpers from "./views/helpers/helpers.js"

const env = getEnv()
const PORT = env.PORT
const app = express()

app.engine(
  "handlebars", 
  engine({
    helpers
  })
)

app.set("view engine", "handlebars")
app.set("views", `${process.cwd()}/src/views`)

app.use((req,res, next) =>{
  res.locals.info = "Info"
  next()
})

app.use(logger('simple'))

app.use('/css', [
  express.static(`${process.cwd()}/public/css`),
  express.static(`${process.cwd()}/node_modules/bootstrap/dist/css/`)
])
app.use('/js', [
  express.static(`${process.cwd()}/public/js`),
  express.static(`${process.cwd()}/node_modules/bootstrap/dist/js/`)
])
app.use('/img', express.static(`${process.cwd()}/public/img`))

app.use(express.urlencoded({extended: false}))

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

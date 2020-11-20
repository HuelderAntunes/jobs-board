import App from './app'
import routes from './routes/index'
import * as bodyParser from 'body-parser'
import loggerMiddleware from './middlewares/logger'
import * as dotenv from 'dotenv'
import './database'

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

export const port = +process.env.PORT!

const app = new App({
    port: port,
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        routes,
        loggerMiddleware
    ]
})

app.listen()

export default app

import { Router } from 'express'
import jobsRouter from './jobs.routes'
import tagsRouter from './tags.routes'
import subscribersRouter from './subscribers.routes'
import cors from 'cors'

const routes = Router()

//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    // origin: API_URL,
    preflightContinue: false
}

//use cors middleware
routes.use(cors(options))

//add your routes

//enable pre-flight
routes.options('*', cors(options))

routes.use('/jobs', jobsRouter)
routes.use('/tags', tagsRouter)
routes.use('/subscribers', subscribersRouter)
export default routes

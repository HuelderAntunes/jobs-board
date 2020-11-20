import { Router } from 'express'
import jobsRouter  from './jobs.routes'

const routes = Router()

routes.use('/jobs', jobsRouter)

export default routes
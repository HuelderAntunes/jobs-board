import { Router } from 'express'
import { ErrorHandler } from '../helpers/errors'
import CreateSubscriberService from '../services/CreateSubscriberService'
import * as yup from 'yup'
import { MigrationInterface } from 'typeorm'

const subscribersRouter = Router()

subscribersRouter.post('/', async (request, response) => {
    try {
        const schema = yup.object().shape({
            email: yup
                .string()
                .email()
                .required()
        })

        const isValid = await schema.isValid(request.body)

        if (!isValid) {
            throw new ErrorHandler(422, 'Invalid fields.')
        }

        const { email } = request.body

        const createSubscriberService = new CreateSubscriberService()

        if (!(await createSubscriberService.execute({ email }))) {
            throw new ErrorHandler(422, 'Invalid fields.')
        }

        return response.json({ success: 'Subscriber created successfully!' })
    } catch {
        return response.status(500).json({
            error: {
                message: 'Internal error. May the email already exists.'
            }
        })
    }
})

export default subscribersRouter

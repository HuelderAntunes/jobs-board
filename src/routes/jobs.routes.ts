import { Router } from 'express'
import Job from '../entities/Job'
import CreateJobService from '../services/CreateJobService'
import JobsRepository from '../repositories/JobsRepository'
import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'

const jobsRouter = Router()

jobsRouter.get('/', async (request, response) => {
    const jobsRepository = getCustomRepository(JobsRepository)

    const jobs = await jobsRepository.find()

    return response.json({
        success: {
            jobs: jobs
        }
    })
})

jobsRouter.get('/:id', async (request, response) => {
    const jobsRepository = getCustomRepository(JobsRepository)

    const job = await jobsRepository.findOne({
        where: {
            id: request.params.id
        }
    })

    if (!job) {
        return response
            .status(404)
            .json({ error: { message: 'Job not found.' } })
    }

    return response.json({
        success: {
            ...job
        }
    })
})

jobsRouter.post('/', async (request, response) => {
    const {
        role,
        company,
        companyWebsite,
        companyEmail,
        contactEmail,
        description,
        applicationUrl,
        paymentStatus,
        expirationDate,
        createdAt
    } = request.body

    const schema = yup.object().shape({
        role: yup.string().required(),
        company: yup.string().required(),
        companyWebsite: yup.string().required(),
        companyEmail: yup
            .string()
            .email()
            .required(),
        contactEmail: yup
            .string()
            .email()
            .required(),
        description: yup.string().required(),
        applicationUrl: yup.string().required(),
        expirationDate: yup.date().required(),
        createdAt: yup.date().required()
    })

    const isValid = await schema.isValid({
        role,
        company,
        companyWebsite,
        companyEmail,
        contactEmail,
        description,
        applicationUrl,
        paymentStatus,
        expirationDate,
        createdAt
    })

    if (!isValid) {
        return response
            .status(422)
            .json({ error: { message: 'Invalid fields.' } })
    }

    const createJob = new CreateJobService()

    const job = await createJob.execute({
        role,
        company,
        companyWebsite,
        companyEmail,
        contactEmail,
        description,
        applicationUrl,
        expirationDate,
        createdAt
    })

    if (!job) {
        return response
            .status(500)
            .json({ error: { message: 'Job cannot be created.' } })
    }

    return response.json({ success: job })
})

export default jobsRouter

import { Router } from 'express'
import Job from '../entities/Job'
import CreateJobService from '../services/CreateJobService'
import JobsRepository from '../repositories/JobsRepository'
import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'
import { parseISO } from 'date-fns'

const jobsRouter = Router()

jobsRouter.get('/', async (request, response) => {
    const jobsRepository = getCustomRepository(JobsRepository)

    const jobs = await jobsRepository.find({
        relations: ['tags']
    })

    return response.json({
        success: {
            jobs: jobs
        }
    })
})

jobsRouter.get('/:slug', async (request, response) => {
    const jobsRepository = getCustomRepository(JobsRepository)

    const job = await jobsRepository.findOne({
        where: {
            slug: request.params.slug
        },
        relations: ['tags']
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
    try {
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
            companyAvatar,
            tags,
            slug
        } = request.body

        const schema = yup.object().shape({
            role: yup.string().required(),
            slug: yup.string().required(),
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
            companyAvatar: yup.string().required(),
            description: yup.string().required(),
            applicationUrl: yup.string().required(),
            expirationDate: yup.date().required(),
            tags: yup.array()
        })

        const isValid = await schema.isValid({
            role,
            company,
            companyWebsite,
            companyEmail,
            contactEmail,
            description,
            applicationUrl,
            expirationDate,
            companyAvatar,
            tags,
            slug
        })

        const convertedExpirationDate = parseISO(expirationDate)

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
            companyAvatar,
            description,
            applicationUrl,
            slug,
            expirationDate: convertedExpirationDate,
            tags
        })

        if (!job) {
            return response
                .status(500)
                .json({ error: { message: 'Job cannot be created.' } })
        }

        return response.json({ success: job })
    } catch {
        return response
            .status(500)
            .json({ error: { message: 'Internal error.' } })
    }
})

export default jobsRouter

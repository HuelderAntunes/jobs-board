import JobsRepository from '../repositories/JobsRepository'
import Job from '../entities/Job'
import { getCustomRepository } from 'typeorm'

interface Request {
    role: string
    company: string
    companyWebsite: string
    companyEmail: string
    contactEmail: string
    description: string
    applicationUrl: string
    expirationDate: string
    createdAt: Date
}

class CreateJobService {
    public async execute ({
        role,
        company,
        companyWebsite,
        companyEmail,
        contactEmail,
        description,
        applicationUrl,
        expirationDate,
        createdAt
    }: Request): Promise<Job> {
        const jobsRepository = getCustomRepository(JobsRepository)
        const job = jobsRepository.create({
            role,
            company,
            companyWebsite,
            companyEmail,
            contactEmail,
            description,
            applicationUrl,
            paymentStatus: 'pending',
            expirationDate,
            createdAt
        })

        await jobsRepository.save(job)

        return job
    }
}

export default CreateJobService

import JobsRepository from '../repositories/JobsRepository'
import Job from '../entities/Job'
import Tag from '../entities/Tag'
import { getCustomRepository, getRepository } from 'typeorm'
import _ from 'lodash'

interface Request {
    role: string
    company: string
    companyWebsite: string
    companyAvatar: string
    companyEmail: string
    contactEmail: string
    description: string
    applicationUrl: string
    expirationDate: Date
    slug: string
    tags?: string[]
}

class CreateJobService {
    public async execute ({
        role,
        company,
        companyWebsite,
        companyAvatar,
        companyEmail,
        contactEmail,
        description,
        applicationUrl,
        expirationDate,
        tags,
        slug
    }: Request): Promise<Job | boolean> {
        try {
            const jobsRepository = getCustomRepository(JobsRepository)
            const job = jobsRepository.create({
                slug,
                role,
                company,
                companyWebsite,
                companyAvatar,
                companyEmail,
                contactEmail,
                description,
                applicationUrl,
                paymentStatus: 'pending',
                expirationDate
            })

            const tagsRepository = getRepository(Tag)

            await jobsRepository.save(job)

            if (tags) {
                const tagsList = tags.map(name => {
                    return { name: _.startCase(name), job }
                })

                const tagsCreate = tagsRepository.create(tagsList)
                await tagsRepository.save(tagsCreate)
            }

            return job
        } catch {
            return false
        }
    }
}

export default CreateJobService

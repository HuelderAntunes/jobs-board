import { response, Router } from 'express'
import { getRepository } from 'typeorm'
import Tag from '../entities/Tag'

const tagsRouter = Router()
1
tagsRouter.get('/', async (request, response) => {
    const tagsRepository = getRepository(Tag)

    const tags = await tagsRepository
        .createQueryBuilder('tag')
        .select(['tag.name'])
        .distinctOn(['tag.name'])
        .getMany()

    return response.json({ success: tags })
})

export default tagsRouter

import { getRepository } from 'typeorm'
import Subscriber from '../entities/Subscriber'

interface Request {
    email: string
}
class CreateSubscriberService {
    async execute ({ email }: Request) {
        try {
            const subscribersRepository = getRepository(Subscriber)

            const subscriber = subscribersRepository.create({ email })

            await subscribersRepository.save(subscriber)

            return true
        } catch {
            return false
        }
    }
}

export default CreateSubscriberService

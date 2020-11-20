import Job from '../entities/Job'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Job)
class JobsRepository extends Repository<Job> {}

export default JobsRepository

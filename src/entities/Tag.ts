import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Job from './Job'

@Entity()
class Tag {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @ManyToOne(
        type => Job,
        job => job.tags
    )
    job: Job
}

export default Tag

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Tag from './Tag'

@Entity()
class Job {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    role: string

    @Column()
    company: string

    @Column()
    slug: string

    @Column()
    companyAvatar: string

    @Column()
    companyWebsite: string

    @Column()
    companyEmail: string

    @Column()
    contactEmail: string

    @Column('text')
    description: string

    @Column()
    applicationUrl: string

    @Column()
    paymentStatus: string

    @Column('timestamp with time zone')
    expirationDate: Date

    @Column('timestamp with time zone', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @OneToMany(
        type => Tag,
        tag => tag.job
    )
    tags: Tag[]
}

export default Job

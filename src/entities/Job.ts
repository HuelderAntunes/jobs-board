import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Job {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    role: string

    @Column()
    company: string

    @Column('')
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

    @Column('timestamp with time zone')
    createdAt: Date
}

export default Job

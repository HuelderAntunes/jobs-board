import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Job from './Job'

@Entity()
class Subscriber {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true, unique: true })
    phone: string

    @Column('timestamp with time zone', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date
}

export default Subscriber

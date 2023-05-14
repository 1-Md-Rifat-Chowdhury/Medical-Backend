import { DoctorEntity } from "src/doctor/entity/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class AdminEntity
{
    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    name: string;


    @Column()
    email: string;
    

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    filename : string;

    @OneToMany(() => DoctorEntity,(doctor) => doctor. admin)
    doctors: DoctorEntity[]

    
}
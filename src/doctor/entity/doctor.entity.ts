import { AdminEntity } from "src/admin/entity/adminentity.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Doctor")
export class DoctorEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    email: string;
    

    @Column()
    password: string;

    @Column()
    address: string;

   @ManyToOne(()=> AdminEntity, (admin) => admin.doctors)
   admin:AdminEntity


}
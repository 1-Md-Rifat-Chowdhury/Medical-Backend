import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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

    
}
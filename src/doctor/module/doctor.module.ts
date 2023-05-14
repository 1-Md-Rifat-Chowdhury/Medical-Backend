import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorEntity } from "../entity/doctor.entity";

@Module(
    {   
        imports:[TypeOrmModule.forFeature([DoctorEntity])],
        controllers:[],
        providers:[],


    })
export class DoctorModule{}
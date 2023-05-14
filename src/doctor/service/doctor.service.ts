import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DoctorEntity } from "../entity/doctor.entity";
import { Repository } from "typeorm";
import { DoctorForm } from "../dto/doctor.dto";


@Injectable()
export class DoctorService
{
    constructor(
        @InjectRepository(DoctorEntity)
        private doctorRepo: Repository<DoctorEntity>,
    ){}


    inserDoctor(mydto:DoctorForm):any
    {
        return this.doctorRepo.save(mydto);

    }

    getAdminByDoctor(id):any
    {
        return this.doctorRepo.find({where: {id:id}, relations:{admin:true,},});
    }

}
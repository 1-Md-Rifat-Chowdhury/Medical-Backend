import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "../entity/adminentity.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService
{   
    constructor
    (
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>
    ){}


    getIndex():any 
    {
        
         return this.adminRepo.find();

    }

    async getUserByID(id)
    {

        const data= await this.adminRepo.findOneBy({ id });
        console.log(data);
        if(data!==null)
        {
            return data;
        }
        else
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    getUserByIDName(qry):any
    {
        return this.adminRepo.findOneBy({id:qry.id, name:qry.name});
        
    }


    async insertUser(mydto)
    {
        const salt =await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password = hassedpassed;
        return this.adminRepo.save(mydto);
    }



}
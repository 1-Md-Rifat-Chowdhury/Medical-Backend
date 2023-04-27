import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "../entity/adminentity.entity";
import { Repository } from "typeorm";

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

    async getUserByID( id )
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



}
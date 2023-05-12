import { Module } from "@nestjs/common";
import { AdminController } from "../controller/admin.controller";
import { AdminService } from "../service/adminservice.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "../entity/adminentity.entity";




@Module
(
    {
        imports:
        [
            TypeOrmModule.forFeature([AdminEntity])
        ],

        controllers:[AdminController],
        providers:[AdminService],

    }
)
export class AdminModule{}
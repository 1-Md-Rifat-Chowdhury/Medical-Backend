import { Module } from "@nestjs/common";
import { AdminController } from "../controller/admin.controller";
import { AdminService } from "../service/adminservice.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "../entity/adminentity.entity";
import { DoctorEntity } from "src/doctor/entity/doctor.entity";
import { DoctorService } from "src/doctor/service/doctor.service";
import { MailerModule } from "@nestjs-modules/mailer";




@Module
(
    {
        imports:
        [
            MailerModule.forRoot({
                transport:{
                    host:'smtp.gmail.com',
                    port:465,
                    ignoreTLS:true,
                    secure:true,
                    auth:{user:'u r mail addreess',
                pass: 'u r app password'},
                }
            }),






            TypeOrmModule.forFeature([AdminEntity,DoctorEntity]),
        ],

        controllers:[AdminController],
        providers:[AdminService,DoctorService],

    }
)
export class AdminModule{}
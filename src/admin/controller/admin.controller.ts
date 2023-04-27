import { Body, Controller, Get, Param, ParseIntPipe, Query,UseInterceptors } from "@nestjs/common";
import { AdminService } from "../service/adminservice.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('/admin')
export class AdminController
{
    constructor
    (
        private adminService:AdminService
    ){}




    //Get crud operation

        @Get('/index')
        getAdmin():any
        {
            return this.adminService.getIndex();

        }


        @Get('/findadmin/:id')

        getAdminByID(@Param('id',ParseIntPipe) id: number):any
        {
            return this.adminService.getUserByID(id);
        }

        @Get('/findadmin')
        getAdminByIDName(@Query() qry: any ):any
        {
            return this.adminService.getUserByIDName(qry);
        }

        // @Post('/insertadmin')

        // @UseInterceptors
        // (FileInterceptor
        //     (
        //         'myfile',
        //         {
        //             storage:diskStorage
        //             (
        //                 {
        //                     destination: './uploads',
        //                     filename: function(req, file,cb)
        //                     {
        //                         cb(null,Date.now()+file.originalname)
        //                     }
        //                 }
        //             )
        //         }
        //     )
        // )
        // insertAdmin(@Body())


}



import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Query,UploadedFile,UseInterceptors } from "@nestjs/common";
import { AdminService } from "../service/adminservice.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AdminForm } from "../dto/adminform.dto";


@Controller('/admin')
export class AdminController
{
    constructor
    (
        private adminService:AdminService
    ){}




    //Get crud operation
        @Get('/')
        getHello():any 
        {
            return"Hello Admin";
        }

        @Get('/index')
        getAdmin():any
        {
            return this.adminService.getIndex();

        }


        @Get('/findadmin/:id')

        getAdminByID(@Param('id', ParseIntPipe) id:number):any
        {
            return this.adminService.getUserByID(id);
        }

        @Get('/findadmin')
        getAdminByIDName(@Query() qry: any ):any
        {
            return this.adminService.getUserByIDName(qry);
        }

        @Post('/insertadmin')

        @UseInterceptors
        (FileInterceptor
            (
                'myfile',
                {
                    storage: diskStorage
                    (
                        {
                            destination: './uploads',
                            filename: function(req, file,cb)
                            {
                                cb(null,Date.now()+file.originalname)
                            }
                        }
                    )
                }
            )
        )
        insertAdmin(@Body() mydto:AdminForm, @UploadedFile( new ParseFilePipe({validators:
            [
                new MaxFileSizeValidator({maxSize:160000}),
                new FileTypeValidator ({ fileType: 'png|jpg|Jpeg|'}),                
            ]
        }),
        )
        file: Express.Multer.File)
        {
            mydto.filename = file.filename;
            console.log(mydto)
            return this.adminService.insertUser(mydto)
        }


}



import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query,Session,UploadedFile,UseGuards,UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "../service/adminservice.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AdminForm } from "../dto/adminform.dto";
import { SessionGuard } from "../guard/SessionGuard";
import session from "express-session";
import { AdminFormUpdate } from "../dto/adminformUpdate.dto";



@Controller('/admin')
export class AdminController
{
    constructor
    (
        private adminService:AdminService
    ){}




    //Get crud operation (Find, show)
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


        // Post crud opration ( create, insert)

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



        // Put crud operation (update, change, edit)

        @Put('/updateadmin')
        @UseGuards(SessionGuard)
        @UsePipes(new ValidationPipe())
        updateAdmin(@Session() session, @Body('name') name:string):any
        {
            console.log(session.email);
            return this.adminService.updateUser(name, session.email)
        }



        @Put('/updateadmin/:id')
        @UsePipes(new ValidationPipe())
        updateAdminbyid( @Body() mydto:AdminFormUpdate, @Param('id', ParseIntPipe)id:number,): any
        {
            return this.adminService.updateUserbyid(mydto,id);

        }
        

        // Delete crud operation (Remove, delete)

        @Delete('/deleteadmin/:id')
        deleteadminbyid(@Param('id', ParseIntPipe) id:number):any
        {
            return this.adminService.deleteUserbyid(id);
        }


}



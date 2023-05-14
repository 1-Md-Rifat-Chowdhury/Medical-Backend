import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query,Res,Session,UnauthorizedException,UploadedFile,UseGuards,UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "../service/adminservice.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AdminForm } from "../dto/adminform.dto";
import { SessionGuard } from "../guard/SessionGuard";
import { AdminFormUpdate } from "../dto/adminformUpdate.dto";
import { DoctorForm } from "src/doctor/dto/doctor.dto";
import { DoctorService } from "src/doctor/service/doctor.service";




@Controller('/admin')
export class AdminController
{
    constructor
    (
        private adminService:AdminService,
        private doctorService: DoctorService,
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

        @Post('/insertdoctor')
        @UsePipes(new ValidationPipe())
        insertDoctor(@Body() doctordto:DoctorForm):any{

            return this.doctorService.insertDoctor(doctordto)
        }

        @Get('/finddoctorsbyadmin/:id')
        getDoctorByAdminID(@Param('id',ParseIntPipe)id:number):any
        {
            return this.adminService.getDoctorsByAdminID(id);

        }

        @Get('/getimage/:name')
        getImages(@Param('name')name, @Res() res)
        { res.sendFile(name,{root:'./uploads'})

        }

        @Get('/findadminbydoctor/:id')
        getAdminByDoctorID(@Param('id',ParseIntPipe)id:number):any
        {
            return this.doctorService.getAdminByDoctorID(id);
        }
    

    //Sign Up

        @Post('/signup')
        @UseInterceptors(FileInterceptor('myfile',
        {storage:diskStorage(
            {destination:'./uploads', filename: function(req,file,cb)
              {
                 cb(null,Date.now()+file.originalname)

              }
            }
        )
        }
        )
        )

        signup(@Body() mydto:AdminForm, 
        @UploadedFile( new ParseFilePipe(
            {validators:
        [
        new MaxFileSizeValidator({maxSize:160000}),
        new FileTypeValidator ({ fileType: 'png|jpg|jpeg|'}),                
        ]
            }),

        )
        
        file:Express.Multer.File
        )
        
        {
         mydto.filename =file.fieldname;
         console.log(mydto)
         return this.adminService.signup(mydto);
        }


        @Post('/signin')
        @UsePipes(new ValidationPipe())
        async signin(@Session() session,@Body() mydto:AdminForm)
        {
            const res = await(this.adminService.signup(mydto));
            if(res== true)

            {
                session.email=mydto.email;
                return(session.email);

            }
            else
            {
                throw new UnauthorizedException({message : " Something Error "});

            }

        }

        @Get('/signout')
        signout(@Session() session)
        {
            if(session.destroy())
            {
                return { message: "you are logged out"};

            }
            else 
            {
                throw new UnauthorizedException("Error action");

            }

        }

        @Post('/sendmail')
        sendEmail(@Body() mydata){
            return this.adminService.sendEmail(mydata)
        }


}


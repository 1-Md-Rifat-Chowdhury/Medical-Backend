import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class DoctorForm
{
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @Length(3,8)
    password: string;

    address: string;

    adminid: number;

}
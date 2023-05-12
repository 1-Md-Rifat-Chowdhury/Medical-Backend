import { IsEmail,Length, IsNotEmpty } from "class-validator";


export class AdminForm
{
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(5,12)
    @IsNotEmpty()
    password: string;

    address: string;

    filename:string;

}
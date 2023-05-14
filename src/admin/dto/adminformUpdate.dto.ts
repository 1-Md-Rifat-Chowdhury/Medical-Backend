import { Length } from "class-validator";

export class AdminFormUpdate
{
  @Length(3,9)
  name: string;
    
}
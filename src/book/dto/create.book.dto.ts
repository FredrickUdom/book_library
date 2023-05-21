import { IsCreditCard, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../enum/category.enum";

export class createBookDTO{
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category,{message:'please enter the correct enum'})
    readonly category: Category;
}
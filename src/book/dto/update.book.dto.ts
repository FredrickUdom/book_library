import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../enum/category.enum";

export class updateBookDTO{
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category,{message:'please enter the correct enum'})
    readonly category: Category

}
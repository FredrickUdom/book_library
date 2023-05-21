import { Category } from "../enum/category.enum";

export class createBookDTO{
    readonly title: string;
    readonly description: string;
    readonly author: string;
    readonly price: number;
    readonly category: Category

}
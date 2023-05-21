import { Category } from "../enum/category.enum";

export class updateBookDTO{
    readonly title: string;
    readonly description: string;
    readonly author: string;
    readonly price: number;
    readonly category: Category

}
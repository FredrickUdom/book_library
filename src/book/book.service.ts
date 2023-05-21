import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schema/book.schema';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private readonly bookModel:mongoose.Model<Book>){}

    async findAll(): Promise<Book []>{
        const find = await this.bookModel.find().exec()
        return find;
    }

    async createBook(books:Book): Promise<Book>{
        const book = await this.bookModel.create(books);
        return book.save();
    }

    // async findById(id:string): Promise<Book>{
    //     const findId = await this.bookModel.findById({ _id: id }).exec();
    //     if(!findId){
    //         throw new NotFoundException('sorry no book found');
    //     }
    //     return findId;
    // }

        async findById(_id:string): Promise<Book>{
        const findId = await this.bookModel.findOne({ _id: _id }).exec();
        if(!findId){
            throw new NotFoundException('sorry no book found');
        }
        return findId;
    }


    async updateById(_id: string, book:Book): Promise<Book>{
        const update = await this.bookModel.findByIdAndUpdate(_id, book, {new: true, runValidators:true});

        if(!update){
            throw new NotFoundException('sorry could not update')
        }

        return update;
    }

    async deleteById(_id: string){
        const deleteBook = await this.bookModel.findByIdAndDelete(_id)

        if(!deleteBook){
            throw new NotFoundException(`book id:${_id} not found to delete`);
        }

        return{
            statusCode: 200,
            message: `book deleted successfully`
        }
    }
}

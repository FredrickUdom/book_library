import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import {Query} from 'express-serve-static-core';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private readonly bookModel:mongoose.Model<Book>){}

    async findAll(query:Query): Promise<Book []>{
        // implementing pagination here
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skipPage = resPerPage * (currentPage -1);
        //pagination ended here

        //implementing search keyword here
        const keyword = query.keyword ?{
            title:{
                $regex: query.keyword,
                $options: 'i'
            }
        }:{}
        const find = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skipPage).exec();
        return find;
    }

    async createBook(books:Book): Promise<Book>{
        const book = await this.bookModel.create(books);
        return book.save();
    }

        async findById(_id:string): Promise<Book>{
            // validating mongooseDB ID error
            const isValidateId = mongoose.isValidObjectId(_id);
            if(!isValidateId){
                throw new BadRequestException('please enter a valid id number');
            }

        const findId = await this.bookModel.findById({ _id: _id }).exec();
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

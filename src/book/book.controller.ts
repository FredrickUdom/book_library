import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { createBookDTO } from './dto/create.book.dto';
import { updateBookDTO } from './dto/update.book.dto';
import { AnyObject } from 'mongoose';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAll(): Promise<Book []>{
        return await this.bookService.findAll()
    }

    @Post('create')
    async createBook(@Body()book: createBookDTO):Promise<Book>{
        return await this.bookService.createBook(book)
    }

    @Get('/:id')
    async findById(@Param('id')id: string): Promise<Book>{
        return await this.bookService.findById(id)
    }

    @Put('/:id')
    async updates(@Param('id')id, @Body()update:updateBookDTO): Promise<Book>{
        return await this.bookService.updateById(id, update)
    }

    @Delete(':_id')
    async deleteById(@Param('_id')_id):Promise<AnyObject>{
        return await this.bookService.deleteById(_id)
    }
}

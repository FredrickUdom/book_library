import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/.env',
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forRoot('mongodb+srv://book_library:8xWglB4Es70frqlk@cluster0.ubyns6e.mongodb.net/'),
    BookModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsModule } from './modules/objects/object.module';
import { S3Service } from './utils/s3.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI  as string), 
    ObjectsModule,
  ],
  providers: [S3Service],
})
export class AppModule {}

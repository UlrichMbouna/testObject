import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectSchema } from './entity/object.entity';
import { ObjectsService } from './service/object.service';
import { ObjectsGateway } from './gateways/object.gateway';
import { ObjectsController } from './controller/object.controller';
import { S3Service } from 'src/utils/s3.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Object', schema: ObjectSchema }])],
  providers: [ObjectsService, ObjectsGateway,S3Service],
  controllers: [ObjectsController],
  exports: [S3Service],
})
export class ObjectsModule {}

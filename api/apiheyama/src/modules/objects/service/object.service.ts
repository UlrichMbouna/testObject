import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3Service } from 'src/utils/s3.service';
import { CreateObjectDto } from '../dtos/create-object-dto';
import { ObjectsGateway } from '../gateways/object.gateway';

@Injectable()
export class ObjectsService {
    constructor(
        @InjectModel('Object') private readonly objectModel: Model<any>,
        private readonly s3Service: S3Service,
        private readonly objectsGateway: ObjectsGateway,
    ) { }

    async create(createObjectDto: CreateObjectDto, file: Express.Multer.File) {
        let imageUrl = '';

        if (file) {
            imageUrl = await this.s3Service.uploadImage(file);
        }

        const createdObject = new this.objectModel({
            ...createObjectDto,
            imageUrl,
        });

        const savedObject = await createdObject.save();

        this.objectsGateway.emitObjectCreated(savedObject);

        return savedObject;
    }


    async findAll() {
        const objects = await this.objectModel.find().exec();

        return objects.map(obj => {
            const objectJson = obj.toJSON();
            if (objectJson.imageUrl) {
                objectJson.imageUrl = objectJson.imageUrl.replace(
                    'minio:9000',
                    `${process.env.IP_ADDRESS}:9000`
                  );
                  
            }
            return objectJson;
        });
    }

    async findOne(id: string) {
        const object = await this.objectModel.findById(id).exec();
        
        if (!object) {
          throw new NotFoundException(`Objet ${id} introuvable`);
        }
      
        const objectJson = object.toObject();
      
        if (objectJson.imageUrl) {
            objectJson.imageUrl = objectJson.imageUrl.replace(
                'minio:9000',
                `${process.env.IP_ADDRESS}:9000`
              );
              
        }
      
        return objectJson;
      }

    async remove(id: string) {
        const object = await this.objectModel.findById(id).exec();

        if (!object) {
            throw new NotFoundException(`Object with ID ${id} not found`);
        }

        if (object.imageUrl) {
            try {
                await this.s3Service.deleteImage(object.imageUrl);
            } catch (error) {
                console.error("Erreur suppression S3:", error.message);
            }
        }
        const deleted = await this.objectModel.findByIdAndDelete(id).exec();
        this.objectsGateway.emitObjectDeleted(id);
        return deleted;
    }
}
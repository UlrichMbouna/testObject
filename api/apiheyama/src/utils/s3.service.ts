import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class S3Service {
    private s3: AWS.S3;


    constructor() {
        this.s3 = new AWS.S3({
            endpoint: process.env.S3_ENDPOINT,
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
            region: process.env.S3_REGION,

            s3ForcePathStyle: true,
            signatureVersion: 'v4',
        });
    }
    async onModuleInit() {
        const bucketName = process.env.S3_BUCKET || 'mon-bucket-local';

        try {
            await this.s3.headBucket({ Bucket: bucketName }).promise();
            console.log(`Bucket "${bucketName}" prêt.`);
        } catch (error) {
            if (error.statusCode === 404) {
                console.log(`Bucket "${bucketName}" inexistant. Création en cours...`);
                await this.s3.createBucket({ Bucket: bucketName }).promise();
                console.log(`Bucket "${bucketName}" créé avec succès.`);
            } else {
                console.error('Erreur lors de la vérification du bucket:', error);
            }
        }
    }
    async uploadImage(file: Express.Multer.File) {


        if (!file.buffer) {
            throw new Error("Le contenu du fichier (buffer) est manquant.");
        }

        const params = {
            Bucket: process.env.S3_BUCKET!,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        if (!params.Bucket) {
            throw new Error('Le nom du bucket S3 n\'est pas défini');
        }

        const uploadResult = await this.s3.upload(params).promise();
        return uploadResult.Location;
    }
    async deleteImage(imageUrl: string) {
        const fileName = imageUrl.split('/').pop();

        if (!fileName) {
            throw new Error('Le nom de fichier est introuvable dans l\'URL');
        }

        const bucketName = process.env.S3_BUCKET;
        if (!bucketName) {
            throw new Error('Le nom du bucket S3 n\'est pas défini dans les variables d\'environnement');
        }

        const params = {
            Bucket: bucketName,
            Key: fileName
        };

        try {
            await this.s3.deleteObject(params).promise();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'objet:', error);
            throw error;
        }
    }
}

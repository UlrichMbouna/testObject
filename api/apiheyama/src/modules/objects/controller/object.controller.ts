import { Controller, Get, Post, Param, Body, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateObjectDto } from '../dtos/create-object-dto';
import { ObjectsService } from '../service/object.service';

@Controller('objects')
export class ObjectsController {
  constructor(
    private readonly objectsService: ObjectsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(@Body() createObjectDto: CreateObjectDto, @UploadedFile() file: Express.Multer.File) {
    return await this.objectsService.create(createObjectDto, file);
  }

  @Get()
  async findAll() {
    return await this.objectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.objectsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.objectsService.remove(id);
  }
}

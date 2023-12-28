import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { CreateCommentDto } from './dto/comment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get('image/:id')
  async getImage(@Param("id") id :string ){
    try {
      return await this.userService.getImage(id) 
    } catch (error) {
      console.log(error);
      return {message:'error get image detail!!!!', status:HttpStatus.BAD_REQUEST}
    }
  }
  @Get('get-comment/:id')
  async getComent(@Param("id") id :string ){
    try {
      return await this.userService.getCommentsByImageId(id) 
    } catch (error) {
      return {message:'error get comment by id!!!!', status:HttpStatus.BAD_REQUEST}
    }
  }

  
  @UseInterceptors(FilesInterceptor("avatar", 10, {
    storage: diskStorage({
      destination: process.cwd() + "/src/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload")
  upload(@UploadedFiles() file: Express.Multer.File[]) {

    return file;
  }
  @Post('comments')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.userService.createComment(createCommentDto);
  }
  @Get('image-save/:id')
 async getSavedInfoByImageId(@Param('id') id : string){
  try {
    return await this .userService.getSavedInfoByImageId(id);
  } catch (error) {
    return {message:'error get save info by image!!!!', status:HttpStatus.BAD_REQUEST}

  }
    
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

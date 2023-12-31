import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseInterceptors, UploadedFiles, Put, UseGuards, Req, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'express';
import { CreateCommentDto } from './dto/comment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { jwtUtil } from 'src/util/jwtUtil';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtUtil: jwtUtil
    ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('image/:id')
  async getImage(@Param("id") id: string) {
    try {
      return await this.userService.getImage(id)
    } catch (error) {
      console.log(error);
      return { message: 'error get image detail!!!!', status: HttpStatus.BAD_REQUEST }
    }
  }
  @Get('get-comment/:id')
  async getComent(@Param("id") id: string) {
    try {
      return await this.userService.getCommentsByImageId(id)
    } catch (error) {
      return { message: 'error get comment by id!!!!', status: HttpStatus.BAD_REQUEST }
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
  async getSavedInfoByImageId(@Param('id') id: string) {
    try {
      return await this.userService.getSavedInfoByImageId(id);
    } catch (error) {
      return { message: 'error get save info by image!!!!', status: HttpStatus.BAD_REQUEST }

    }
  }

  // API GET thông tin user
  // localhost:8080/user/get-user
  @Get('get-user')
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      console.log(error);
      return { message: 'error...', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API PUT thông tin cá nhân của user
  // localhost:8080/user/put-info 
  @UseGuards(AuthGuard("jwt"))
  @Put('put-info')
  async putInfo(@Body() data: any, @Headers ('Authorization') auth: string) {
    // try {
      let jwt = await this.jwtUtil.decode(auth);
      return this.userService.putInfo(data, jwt.uuid);
    // } catch (error) {
    //   console.log(error);
    //   return { message: 'error...', status: HttpStatus.BAD_REQUEST }
    // }
  }

}

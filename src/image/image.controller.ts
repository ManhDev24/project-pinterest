import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Request } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private configService: ConfigService
  ) { }

  // API GET Danh Sách Ảnh Về
  // localhost:8080/image/get-image
  @Get('get-image')
  findAll() {
    try {
      return this.imageService.findAll();
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API GET Tìm Kiếm Danh Sách Ảnh Theo Tên
  // localhost:8080/image/:iName
  @Get(':iName')
  findName(@Param('iName') iName) {
    try {
      return this.imageService.findName(iName);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API GET danh sách ảnh đã tạo theo user id
  // localhost:8080/image/search/img-created/:userId
  @UseGuards(JwtAuthGuard)
  @Get('search/img-created/:userId')
  findImgCreId(@Param('userId') userId: number) {
    try {
      return this.imageService.findImgCreId(+userId);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API GET danh sách ảnh đã lưu theo user id
  // localhost:8080/image/search/img-saved/:userId
  @UseGuards(JwtAuthGuard)
  @Get('search/img-saved/:userId')
  findImgSavId(@Param('userId') userId: number) {
    try {
      return this.imageService.findImgSavId(+userId);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

  // API DELETE xóa ảnh đã tạo theo id ảnh
  // localhost:8080/image/delete/img-created/:ImgId
  @UseGuards(JwtAuthGuard)
  @Delete('delete/img-created/:ImgId')
  delImgCre(@Param('ImgId') ImgId: number) {
    try {
      return this.imageService.delImgCre(+ImgId);
    } catch (error) {
      console.log(error);
      return { message: 'Error', status: HttpStatus.BAD_REQUEST }
    }
  }

}

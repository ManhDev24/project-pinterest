import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageService {

    prisma = new PrismaClient();

    // GET Danh Sách Ảnh Về
    async findAll() {
        let data = await this.prisma.hinh_anh.findMany();

        return {message:'Complete!', status: 200, data};
    }

    // GET Tìm Kiếm Danh Sách Ảnh Theo Tên
    async findName(iName) {
        let data = await this.prisma.hinh_anh.findMany({
            where: {
                ten_hinh: {
                    contains: iName
                }
            }
        });

        return {message:'Complete!', status: 200, data};
    }

    // GET danh sách ảnh đã tạo theo user id
    async findImgCreId(userId: number) {
        let data = await this.prisma.hinh_anh.findMany({
            where: {
                nguoi_dung_id: userId
            }
        });

        return {message:'Complete!', status: 200, data};
    }

    // GET danh sách ảnh đã lưu theo user id
    async findImgSavId(userId: number) {
        let data = await this.prisma.luu_anh.findMany({
            where: {
                nguoi_dung_id: userId
            }
        });

        return {message:'Complete!', status: 200, data};
    }

    // DELETE xóa ảnh đã tạo theo id ảnh
    async delImgCre(ImgId: number) {
        let data = await this.prisma.hinh_anh.delete({
            where: {
                hinh_id: ImgId
            }
        })

        return {message:'Complete!', status: 200, data};
    }

}

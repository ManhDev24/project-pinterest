import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { jwtUtil } from 'src/util/jwtUtil';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, jwtUtil],
})
export class UserModule {}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  ALREADY_REGISTERED_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './user.constants';
import { PrismaService } from '../common/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async findUser(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }

  async createUser(name: string, password: string) {
    const userExist = await this.findUser(name);
    if (userExist) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const salt = await genSalt(10);
    return this.prisma.user.create({
      data: { name: name, password: await hash(password, salt) },
    });
  }

  async validateUser(name: string, password: string) {
    const user = await this.findUser(name);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return user;
  }

  async login(name: string, userId: number) {
    const payload = { name, userId };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

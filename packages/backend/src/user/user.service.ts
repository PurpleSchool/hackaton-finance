import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  ALREADY_REGISTERED_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './user.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findUser(name: string) {
    return this.usersRepository.findOne({ where: { name } });
  }

  async createUser(name: string, password: string) {
    const userExist = await this.findUser(name);
    if (userExist) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const salt = await genSalt(10);
    return this.usersRepository.save({
      name: name,
      password: await hash(password, salt),
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

    return { name: user.name };
  }

  async login(name: string) {
    const payload = { name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

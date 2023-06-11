import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserDto) {
    const newUser = await this.userService.createUser(dto);
    return { name: newUser.name };
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto) {
    const user = await this.userService.validateUser(dto);
    return this.userService.login(user.name);
  }
}

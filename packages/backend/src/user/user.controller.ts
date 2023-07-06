import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../../contracts';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() dto: User.Request): Promise<User.RegisterResponse> {
    const newUser = await this.userService.createUser(dto.name, dto.password);
    return { name: newUser.name };
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: User.Request): Promise<User.LoginResponse> {
    const user = await this.userService.validateUser(dto.name, dto.password);

    return this.userService.login(user.name, user.id);
  }
}

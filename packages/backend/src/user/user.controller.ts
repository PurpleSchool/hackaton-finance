import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto.Request): Promise<UserDto.RegisterResponse> {
    const newUser = await this.userService.createUser(dto.name, dto.password);
    return { name: newUser.name };
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto.Request): Promise<UserDto.LoginResponse> {
    const user = await this.userService.validateUser(dto.name, dto.password);

    return this.userService.login(user.name, user.id);
  }
}

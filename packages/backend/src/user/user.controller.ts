import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'user register',
    schema: { type: 'object', properties: { name: { type: 'string' } } },
  })
  async register(@Body() dto: UserDto) {
    const newUser = await this.userService.createUser(dto.name, dto.password);
    return { name: newUser.name };
  }

  @HttpCode(200)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'user login and get accessToken',
    schema: { type: 'object', properties: { accessToken: { type: 'string' } } },
  })
  async login(@Body() dto: UserDto) {
    const user = await this.userService.validateUser(dto.name, dto.password);
    return this.userService.login(user.name);
  }
}

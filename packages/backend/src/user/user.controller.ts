import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserSchema } from './dto/user.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(new ZodValidationPipe(UserSchema))
  @Post('register')
  async register(@Body() dto: UserDto) {
    const newUser = await this.userService.createUser(dto.name, dto.password);
    return { name: newUser.name };
  }

  @UsePipes(new ZodValidationPipe(UserSchema))
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto) {
    const user = await this.userService.validateUser(dto.name, dto.password);
    return this.userService.login(user.name);
  }
}

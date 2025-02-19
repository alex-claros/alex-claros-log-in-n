import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const isValid = await this.authService.validateUser(body.email, body.password);
    if (!isValid) {
      return { message: 'Credenciales incorrectas' };
    }
    return { message: 'Login exitoso' };
  }
}

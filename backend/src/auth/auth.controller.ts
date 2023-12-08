// /* eslint-disable prettier/prettier */
// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthDto } from './dto/auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('admin-register')
//   async registerAdmin(@Body() authDto: AuthDto): Promise<any> {
//     try {
//       const { username, password } = authDto;
//       const user = await this.authService.createAdmin(username, password);
//       const token = await this.authService.login(user);

//       return { access_token: token, user };
//     } catch (error) {
//       console.error('Error registering admin:', error);
//       throw error;
//     }
//   }
// }

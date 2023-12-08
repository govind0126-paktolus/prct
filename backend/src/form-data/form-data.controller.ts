import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { FormDataService } from './form-data.service';
import { FormDataDto } from './DTO/form-data.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class FormDataController {
  constructor(
    private readonly formDataService: FormDataService,
    private readonly authService: AuthService,
  ) {}

  @Post('form-data')
  @HttpCode(201)
  async createForm(@Body() formData: FormDataDto): Promise<FormDataDto> {
    return this.formDataService.create(formData);
  }

  @Post('admin-login')
  @UseGuards(AuthGuard('local'))
  async adminLogin(@Body() authDto: AuthDto): Promise<any> {
    const user = await this.authService.validateUser(
      authDto.username,
      authDto.password,
    );

    if (user) {
      const token = await this.authService.login(user);
      return { access_token: token, user: user };
    }
  }

  @Get('get-all-details')
  @UseGuards(AuthGuard('jwt'))
  async getAllDetails(): Promise<any> {
    try {
      const allDetails = await this.formDataService.getAllDetails();
      console.log('allDetails', allDetails);

      return allDetails;
    } catch (error) {
      console.error('Error fetching all details from the database:', error);
      throw new InternalServerErrorException(
        'Error fetching all details from the database',
      );
    }
  }
}

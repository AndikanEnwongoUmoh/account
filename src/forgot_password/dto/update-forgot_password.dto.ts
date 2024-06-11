import { PartialType } from '@nestjs/mapped-types';
import { CreateForgotPasswordDto } from './create-forgot_password.dto';

export class UpdateForgotPasswordDto extends PartialType(CreateForgotPasswordDto) {}

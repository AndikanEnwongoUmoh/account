import { PartialType } from '@nestjs/mapped-types';
import { CreateResetPasswordDto } from './create-reset_password.dto';

export class UpdateResetPasswordDto extends PartialType(CreateResetPasswordDto) {}

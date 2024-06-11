import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
import { ResetPasswordController } from './reset_password.controller';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}

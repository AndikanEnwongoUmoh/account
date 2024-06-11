import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot_password.service';
import { ForgotPasswordController } from './forgot_password.controller';

@Module({
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}

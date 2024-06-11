import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ForgotPasswordModule } from './forgot_password/forgot_password.module';
import { ResetPasswordModule } from './reset_password/reset_password.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/account'),
    UserModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

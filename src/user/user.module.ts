import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([
    { 
      name: User.name,
      schema: UserSchema 
    }
  ]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
    global: true
  })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

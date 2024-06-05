import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { signinDto } from './dto/signin.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
constructor(@InjectModel(User.name) private usermodel: Model<User>,private readonly jwtService: JwtService ){}

async Signup(payload: CreateUserDto){
    const {email, password, ...rest} = payload
    payload.email = payload.email.toLowerCase();

    const user =  await this.usermodel.findOne( {email})
    if(user)
    throw new HttpException('user already exists', 400);

    try{
      const newUser = await this.usermodel.create({ email, password, ...rest});
      const hasshedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hasshedPassword;
      newUser.save()
      return newUser
    }catch(err){
      if (err.code ==="22P02"){
      throw new HttpException('invalid email', 400)
      }
    }
  }

  
 async login(payload: signinDto, @Res() res: Response){
  const {email, password} = payload
  const user = await this.usermodel.findOne({email})
  if(!user){
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
  }
  console.log(user);

  const match= await bcrypt.compare(password, user.password)
  if(!match){
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
  }


  const token = await this.jwtService.signAsync({id: user.id, email:user.email})
  res.cookie('jwt', token, {httpOnly: true, maxAge: 3600000})

  return res.send({
    message: 'Success',
    token: token,
    user: user

  })

 }
  async getAll(){
    return await this.usermodel.find()
  }

  async getOne(id: string){
    const user = await this.usermodel.findOne({id: id})
    if(!user)
    throw new HttpException('user not found', 400)
    return user
  }
}

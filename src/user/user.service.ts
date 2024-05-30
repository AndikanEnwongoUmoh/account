import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { signinDto } from './dto/signin.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
constructor(
@InjectModel(User.name) private usermodel: Model<User>,private readonly jwtService: JwtService ){}

async Signup(payload: CreateUserDto){
    payload.email = payload.email.toLowerCase();
    const {email, password, ...rest} = payload
    const user =  await this.usermodel.findOne({where: {email: payload.email}}) 
    if(user)
    throw new HttpException('user already exists', 400);

    try{
      const newUser = await this.usermodel.create({ email, password, ...rest});
      const user = await bcrypt.hash(newUser.password, 10);
      newUser.password = user;
      return newUser
    }catch(err){
      if (err.code ==="22P02"){
      throw new HttpException('invalid email', 400)
      }
    }
  }
  async login(payload: signinDto, @Res() res: Response) {
    const { email, password } = payload;
    
    // Find user by email
    const user = await this.usermodel.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  
    // Remove password field from the user object
    const { password: _, ...userWithoutPassword } = user;
  
    // Generate JWT token
    const token = await this.jwtService.signAsync({ id: user.id, email: user.email });
  
    // Set cookie with the JWT token
    res.cookie('UserAuthenticated', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'none',
      secure: true, // Ensure this is set to true if you're using HTTPS
    });
  
    // Send response with user data and token
    return res.status(HttpStatus.OK).send({
      message: 'success',
      token: token,
      user: userWithoutPassword,
    });
  }
  async getAll(){
    return await this.usermodel.find()
  }

  async getOne(id: string){
    const user = await this.usermodel.findOne({where: {id: id}})
    if(!user)
    throw new HttpException('user not found', 400)
    return user
  }
}

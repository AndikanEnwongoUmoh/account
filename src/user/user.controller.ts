import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.Signup(payload);
  }

  @Post('login')
  Signin(@Body() payload: CreateUserDto, @Res() res: Response) {
    return this.userService.login(payload, res);
  }

  @Get()
  async getall(){
    return await this.userService.getAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string){
    return await this.userService.getOne(id)
  }
}

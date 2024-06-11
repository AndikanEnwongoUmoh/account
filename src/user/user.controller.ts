import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UsePipes, ValidationPipe, Put } from '@nestjs/common';
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

  @Put('block/:id')
  blockUser(@Param('id') id: string, @Res () res:Response) {
    return this.userService.blockUser(id, res);
  }

  @Put('unblock/:id')
  unblockUser(@Param('id') id: string, @Res () res:Response) {
    return this.userService.unblockUser(id, res);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    return this.userService.logout(res);
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

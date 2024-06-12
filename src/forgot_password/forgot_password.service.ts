import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class ForgotPasswordService {
constructor(
  private readonly userService: UserService,
  private readonly mailerService: MailerService,
){}

async requestPasswordReset(email: string): Promise<void> {
  const user = await this.userService.findByEmail(email)
  if(!user){
    throw new Error('User not found');
  }

const resetToken = uuidv4();
user.resetToken = resetToken;
user.resetTokenExpires = new Date(Date.now() + 36000000)

await this.userService.(user)
}
}

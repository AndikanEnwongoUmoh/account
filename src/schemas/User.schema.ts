import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop({unique: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({default: false})
    isBlocked: boolean

    @Prop()
    resetToken: string

    @Prop()
    resetTokenExpires: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
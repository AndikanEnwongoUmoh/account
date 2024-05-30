import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop({unique: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
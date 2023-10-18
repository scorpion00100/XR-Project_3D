import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  email: string; // Remplacez 'username' par 'email'

  @IsNotEmpty()
  @IsString()
  password: string;
}

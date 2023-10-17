import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  role: string;

  @IsDate()
  date_naissance: Date; // Ajoutez cette ligne pour date_naissance
}

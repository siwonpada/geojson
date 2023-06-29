import { IsNumber, IsNumberString } from 'class-validator';

export class Coodinate {
  @IsNumber({}, { each: true })
  array: number[];
}

export class Radius {
  @IsNumberString()
  radius: string;
}

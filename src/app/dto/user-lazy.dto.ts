import {UserDto} from "./user.dto";

export class UserDtoLazy extends UserDto {

  public username: string;

  public country: string;

  public state: string;

  public gender: string;

  public role: string;
}

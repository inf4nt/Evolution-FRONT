import {UserDto} from "./user.dto";

export class DialogDto {

  public id: number;

  public first: UserDto;

  public second: UserDto;

  public createdDateTimestamp: number;

  public createdDateString: string;

}

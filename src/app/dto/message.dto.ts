
import {User} from "../model/user.model";
import {DialogDto} from "./dialog.dto";

export class MessageDto {

  public id: number;

  public message: string;

  public sender: User;

  public dialog: DialogDto;

  public dateDispatch: number;
}

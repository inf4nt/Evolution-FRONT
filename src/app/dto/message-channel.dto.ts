import {UserDto} from "./user.dto";
import {ChannelDto} from "./channel.dto";

export class MessageChannelDto {

  public id: number;

  public text: string;

  sender: UserDto;

  channel: ChannelDto;

  datePost: number;
}

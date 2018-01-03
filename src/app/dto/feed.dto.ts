import {User} from "../model/user.model";

export class FeedDto {

  public id: number;

  public content: string;

  public date: number;

  public sender: User;

  public toUser: User;

  public tags: Array<string>;
}

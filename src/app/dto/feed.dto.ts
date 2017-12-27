import {User} from "../model/user.model";

export class FeedDto {

  public id: number;

  public content: string;

  public createdDateTimestamp: number;

  public createdDateString: string;

  public sender: User;

  public toUser: User;

  public tags: Array<string>;

  constructor(id: number = 0, content: string = null, createdDateTimestamp: number = null,
              createdDateString: string = null, sender: User = null, toUser: User = null, tags: Array<string> = []) {
    this.id = id;
    this.content = content;
    this.createdDateTimestamp = createdDateTimestamp;
    this.createdDateString = createdDateString;
    this.sender = sender;
    this.toUser = toUser;
    this.tags = tags;
  }
}

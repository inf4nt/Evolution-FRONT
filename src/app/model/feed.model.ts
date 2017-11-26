import {User} from './user.model';

export class Feed {

  private _id: number;

  private _content: string;

  private _createdDateTimestamp: number;

  private _createdDateString: string;

  private _sender: User;

  private _toUser: User;

  private _tags: Array<string>;

  constructor(id: number, content: string, createdDateTimestamp: number, createdDateString: string, sender: User, toUser: User, tags: Array<string>) {
    this._id = id;
    this._content = content;
    this._createdDateTimestamp = createdDateTimestamp;
    this._createdDateString = createdDateString;
    this._sender = sender;
    this._toUser = toUser;
    this._tags = tags;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get createdDateTimestamp(): number {
    return this._createdDateTimestamp;
  }

  set createdDateTimestamp(value: number) {
    this._createdDateTimestamp = value;
  }

  get createdDateString(): string {
    return this._createdDateString;
  }

  set createdDateString(value: string) {
    this._createdDateString = value;
  }

  get sender(): User {
    return this._sender;
  }

  set sender(value: User) {
    this._sender = value;
  }

  get toUser(): User {
    return this._toUser;
  }

  set toUser(value: User) {
    this._toUser = value;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }
}

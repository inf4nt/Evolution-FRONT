import {User} from './user.model';
import {Dialog} from './dialog.model';

export class Message {

  private _id: number;

  private _content: string;

  private _sender: User;

  private _dialog: Dialog;

  private _createdDateTimestamp: number;

  private _createdDateString: string;

  constructor() {
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get sender(): User {
    return this._sender;
  }

  set sender(value: User) {
    this._sender = value;
  }

  get dialog(): Dialog {
    return this._dialog;
  }

  set dialog(value: Dialog) {
    this._dialog = value;
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
}

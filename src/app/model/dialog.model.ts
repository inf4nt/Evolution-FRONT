import {User} from './user.model';

export class Dialog {

  private _id: number;

  private _first: User;

  private _second: User;

  private _createdDateTimestamp: number;

  private _createdDateString: string;

  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get first(): User {
    return this._first;
  }

  set first(value: User) {
    this._first = value;
  }

  get second(): User {
    return this._second;
  }

  set second(value: User) {
    this._second = value;
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

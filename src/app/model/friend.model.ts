import {User} from './user.model';

export class Friend {

  private _first: User;

  private _second: User;

  private _action: User;

  private _status: string;

  constructor() {
  }

  get action(): User {
    return this._action;
  }

  set action(value: User) {
    this._action = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
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

  public static build(first: User, second: User, action: User, status: string): Friend {
    const friend: Friend = new Friend();
    friend.first = first;
    friend.second = second;
    friend.action = action;
    friend.status = status;
    return friend;
  }

}

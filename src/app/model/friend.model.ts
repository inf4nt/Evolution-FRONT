import {User} from './user.model';

export class Friend {

  private _first: User;

  private _second: User;

  private _action: User;

  private _actionStatus: string;

  constructor() {
  }

  get action(): User {
    return this._action;
  }

  set action(value: User) {
    this._action = value;
  }

  get actionStatus(): string {
    return this._actionStatus;
  }

  set actionStatus(value: string) {
    this._actionStatus = value;
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

  public static build(first: User, second: User, action: User, actionStatus: string): Friend {
    const friend: Friend = new Friend();
    friend.first = first;
    friend.second = second;
    friend.action = action;
    friend.actionStatus = actionStatus;
    return friend;
  }

}

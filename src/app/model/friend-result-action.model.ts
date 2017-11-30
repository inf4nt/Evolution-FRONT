

import {User} from './user.model';

export class FriendResultAction {

  private _first: User;

  private _second: User;

  private _action: User;

  private _nextAction: string;

  constructor() {
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

  get action(): User {
    return this._action;
  }

  set action(value: User) {
    this._action = value;
  }

  get nextAction(): string {
    return this._nextAction;
  }

  set nextAction(value: string) {
    this._nextAction = value;
  }

  public static build(first: User, second: User, action: User, nextAction: string): FriendResultAction {
    const friend: FriendResultAction = new FriendResultAction();
    friend.first = first;
    friend.second = second;
    friend.action = action;
    friend.nextAction = nextAction;
    return friend;
  }
}

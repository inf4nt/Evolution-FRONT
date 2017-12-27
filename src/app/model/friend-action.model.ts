export class FriendAction {

  public actionUserId: number;

  public recipientUserId: number;

  public action: string;

  constructor(actionUserId: number = 0, recipientUserId: number = 0, action: string = '') {
    this.actionUserId = actionUserId;
    this.recipientUserId = recipientUserId;
    this.action = action;
  }
}

export class UserSetPassword {

  public id: number;

  public oldPassword: string;

  public newPassword: string;

  constructor(id: number = null, oldPassword: string = null, newPassword: string = null) {
    this.id = id;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

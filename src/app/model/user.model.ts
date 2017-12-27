export class User {

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _nickname: string;
  private _role: string;
  private _username: string;

  constructor() {
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }


  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get values(): any {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      nickname: this.nickname,
      role: this.role,
      username: this.username
    };
  }
}

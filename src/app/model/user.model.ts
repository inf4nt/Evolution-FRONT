export class User {

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _nickname: string;

  constructor(id: number, firstName: string, lastName: string, nickname: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._nickname = nickname;
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
}

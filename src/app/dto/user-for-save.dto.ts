export class UserForSaveDto {

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _nickname: string;
  private _username: string;
  private _password: string;
  private _state: string;
  private _country: string;
  private _gender: string;

  constructor() {
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


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get values(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      nickname: this.nickname,
      username: this.username,
      password: this.password,
      state: this.state,
      country: this.country,
      gender: this.gender
    };
  }
}

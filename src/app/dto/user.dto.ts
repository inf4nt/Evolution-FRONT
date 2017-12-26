export class UserDto {

  public id: number;

  public firstName: string;

  public lastName: string;

  public nickname: string;

  public username: string;

  public country: string;

  public state: string;

  public gender: string;

  public role: string;

  constructor(id: number = null, firstName: string = null, lastName: string = null, nickname: string = null,
              username: string = null, country: string = null, state: string = null, gender: string = null, role: string = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
    this.username = username;
    this.role = role;
    this.country = country;
    this.state = state;
    this.gender = gender;
  }
}

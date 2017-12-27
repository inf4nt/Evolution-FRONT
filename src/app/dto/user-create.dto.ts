export class UserCreateDto {

  public firstName: string;

  public lastName: string;

  public nickname: string;

  public username: string;

  public password: string;

  public state: string;

  public country: string;

  public gender: string;

  constructor(firstName: string = null, lastName: string = null, nickname: string = null,
              username: string = null, password: string = null, state: string = null, country: string = null, gender: string = null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
    this.username = username;
    this.password = password;
    this.state = state;
    this.country = country;
    this.gender = gender;
  }
}

export class UserFull {

  public id: number;

  public firstName: string;

  public lastName: string;

  public nickname: string;

  public username: string;

  public password: string;

  public country: string;

  public state: string;

  public gender: string;

  constructor(id: number = 0, firstName: string = null, lastName: string = null, nickname: string = null,
              username: string = null, password: string = null, country: string = null, state: string = null, gender: string = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
    this.username = username;
    this.password = password;
    this.country = country;
    this.state = state;
    this.gender = gender;
  }
}

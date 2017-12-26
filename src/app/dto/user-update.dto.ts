export class UserUpdateDto {

  public id: number;

  public firstName: string;

  public lastName: string;

  public nickname: string;

  public country: string;

  public state: string;

  public gender: string;

  constructor(id: number = null, firstName: string = null, lastName: string = null, nickname: string = null,
              country: string = null, state: string = null, gender: string = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
    this.country = country;
    this.state = state;
    this.gender = gender;
  }
}

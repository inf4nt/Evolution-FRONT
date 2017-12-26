import {Injectable} from "@angular/core";


@Injectable()
export class EvolutionJwtTokenService {

  public setToken(token: string): void {
    localStorage.setItem('jwtToken', JSON.stringify({
      token: token
    }));
  }

  public getToken(): String {
    const item = JSON.parse(localStorage.getItem('jwtToken'));
    const token = item && item.token;
    return token ? token : null;
  }

  public isLife(): boolean {
    return true;
  }

  public cleanToken(): void {
    localStorage.removeItem('jwtToken');
  }

}

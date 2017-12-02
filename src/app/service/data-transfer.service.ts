import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {Response} from '@angular/http';
import {Feed} from '../model/feed.model';
import {Friend} from '../model/friend.model';
import {Page} from '../model/page';
import {Message} from '../model/message.model';
import {Dialog} from '../model/dialog.model';
import {FriendResultAction} from '../model/friend-result-action.model';
import {UserFull} from "../model/user-full.model";

@Injectable()
export class DataTransfer {

  public responseToModelUser(response: Response): User {
    if (response && response.json()) {
      const json: any = response.json();
      const u: User = new User();
      u.id = json.id;
      u.firstName = json.firstName;
      u.lastName = json.lastName;
      u.nickname = json.nickname;
      u.role = json.role;
      return u;
    }
    return null;
  }

  public jsonToModelFeed(json: any): Feed {
    if (json) {
      const sender: User = this.jsonToModelUser(json.sender);
      const toUser: User = this.jsonToModelUser(json.toUser);
      return new Feed(json.id, json.content, json.createdDateTimestamp, json.createdDateString, sender, toUser, json.tags);
    }
    return null;
  }

  public jsonToModelUser(json: any): User {
    if (json) {
      const u: User = new User();
      u.id = json.id;
      u.firstName = json.firstName;
      u.lastName = json.lastName;
      u.nickname = json.nickname;
      u.role = json.role;
      return u;
    }
    return null;
  }

  public responseToModelFeed(response: Response): Feed {
    if (response && response.json()) {
      const json: any = response.json();
      const sender: User = this.jsonToModelUser(json.sender);
      const toUser: User = this.jsonToModelUser(json.toUser);
      return new Feed(json.id, json.content, json.createdDateTimestamp, json.createdDateString, sender, toUser, json.tags);
    }
    return null;
  }

  public jsonToModelFriend(json: any): Friend {
    if (json) {
      const first: User = this.jsonToModelUser(json.first);
      const second: User = this.jsonToModelUser(json.second);
      const action: User = this.jsonToModelUser(json.action);
      return Friend.build(first, second, action, json.status);
    }
    return null;
  }

  public responseToModelFriend(response: Response): Friend {
    if (response && response.json()) {
      const json: any = response.json();
      const first: User = this.jsonToModelUser(json.first);
      const second: User = this.jsonToModelUser(json.second);
      const action: User = this.jsonToModelUser(json.action);
      return Friend.build(first, second, action, json.status);
    }
    return null;
  }

  public responseToModelFriendResultAction(response: Response): FriendResultAction {
    if (response && response.json()) {
      const json: any = response.json();
      const first: User = this.jsonToModelUser(json.first);
      const second: User = this.jsonToModelUser(json.second);
      const action: User = this.jsonToModelUser(json.action);
      return FriendResultAction.build(first, second, action, json.nextAction);
    }
    return null;
  }

  public responseToModelMessage(response: Response): Message {
    const m: Message = new Message();
    if (response && response.json()) {
      m.id = response.json().id;
      m.content = response.json().content;
      m.sender = this.jsonToModelUser(response.json().sender);
      m.dialog = this.jsonToModelDialog(response.json().dialog);
      m.createdDateString = response.json().createdDateString;
      m.createdDateTimestamp = response.json().createdDateTimestamp;
    }
    return m;
  }

  public jsonToModelDialog(json: any): Dialog {
    const d: Dialog = new Dialog();
    d.id = json.id;
    d.second = this.jsonToModelUser(json.second);
    d.first = this.jsonToModelUser(json.first);
    d.createdDateString = json.createdDateString;
    d.createdDateTimestamp = json.createdDateTimestamp;
    return null;
  }

  public responseToPage<T>(response: Response): Page<T> {
    const page: Page<T> = new Page<T>();
    console.log(response);
    if (response && response.json()) {
      page.content = response.json().content;
      page.totalPages = response.json().totalPages;
      page.totalElement = response.json().totalElements;
    }
    return page;
  }

  public responseToModelUserFull(response: Response): UserFull {
    if (response && response.json()) {
      const r: UserFull = new UserFull();
      r.id = response.json().id;
      r.firstName = response.json().firstName;
      r.lastName = response.json().lastName;
      r.nickname = response.json().nickname;
      r.country = response.json().userAdditionalData.country;
      r.state = response.json().userAdditionalData.state;
      r.gender = response.json().userAdditionalData.gender;
      return r;
    } else {
      return null;
    }
  }



}

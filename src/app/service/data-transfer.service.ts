import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {Response} from '@angular/http';
import {Feed} from '../model/feed.model';
import {Friend} from '../model/friend.model';

@Injectable()
export class DataTransfer {

  responseToModelUser(response: Response): User {
    if (response && response.json()) {
      const json: any = response.json();
      return new User(json.id, json.firstName, json.lastName, json.nickname);
    }
    return null;
  }

  jsonToModelFeed(json: any): Feed {
    if (json) {
      const sender: User = this.jsonToModelUser(json.sender);
      const toUser: User = this.jsonToModelUser(json.toUser);
      return new Feed(json.id, json.content, json.createdDateTimestamp, json.createdDateString, sender, toUser, json.tags);
    }
    return null;
  }

  jsonToModelUser(json: any): User {
    if (json) {
      return new User(json.id, json.firstName, json.lastName, json.nickname);
    }
    return null;
  }

  responseToModelFeed(response: Response): Feed {
    if (response && response.json()) {
      const json: any = response.json();
      const sender: User = this.jsonToModelUser(json.sender);
      const toUser: User = this.jsonToModelUser(json.toUser);
      return new Feed(json.id, json.content, json.createdDateTimestamp, json.createdDateString, sender, toUser, json.tags);
    }
    return null;
  }

  jsonToModelFriend(json: any): Friend {
    if (json) {
      const first: User = this.jsonToModelUser(json.first);
      const second: User = this.jsonToModelUser(json.second);
      const action: User = this.jsonToModelUser(json.action);
      return new Friend(first, second, action, json.status);
    }
    return null;
  }

  responseToModelFriend(response: Response): Friend {
    if (response && response.json()) {
      const json: any = response.json();
      const first: User = this.jsonToModelUser(json.first);
      const second: User = this.jsonToModelUser(json.second);
      const action: User = this.jsonToModelUser(json.action);
      return new Friend(first, second, action, json.status);
    }
    return null;
  }


}

import {Message} from "../model/message.model";
import {Injectable} from "@angular/core";
import {MessageForUpdate} from "../model/message-for-update.model";

@Injectable()
export class TechnicalService {

  public cloneMessage(message: Message): Message {
    let selectedMessage: Message = new Message();
    selectedMessage.id = message.id;
    selectedMessage.sender = message.sender;
    selectedMessage.content = message.content;
    selectedMessage.dialog = message.dialog;
    selectedMessage.createdDateTimestamp = message.createdDateTimestamp;
    selectedMessage.createdDateString = message.createdDateString;
    return selectedMessage;
  }

  public findMessageInList(list: Array<Message>, message: Message): Message {
    for (let m of list) {
      if (m.id = message.id) {
        return m;
      }
    }
  }

  public messageToMessageForUpdate(message: Message): MessageForUpdate {
    let m: MessageForUpdate = new MessageForUpdate();
    m.content = message.content;
    m.id = message.id;
    return m;
  }

  public updateListMessage(list: Array<Message>, message: Message): void {
    for (let i = 0; i < list.length; i++) {
      let el: Message = list[i];
      if (el.id === message.id) {
        list[i] = message;
        break;
      }
    }
  }

}

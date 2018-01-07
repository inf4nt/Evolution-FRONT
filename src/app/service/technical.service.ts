import {Message} from "../model/message.model";
import {Injectable} from "@angular/core";
import {MessageForUpdate} from "../model/message-for-update.model";
import {MessageDto} from "../dto/message.dto";
import {ChannelDto} from "../dto/channel.dto";

@Injectable()
export class TechnicalService {

  public cloneMessage(message: MessageDto): MessageDto {
    let selectedMessage: MessageDto = new MessageDto();
    selectedMessage.id = message.id;
    selectedMessage.sender = message.sender;
    selectedMessage.message = message.message;
    selectedMessage.dialog = message.dialog;
    selectedMessage.dateDispatch = message.dateDispatch;
    return selectedMessage;
  }

  public findMessageInList(list: Array<Message>, message: Message): Message {
    for (let m of list) {
      if (m.id = message.id) {
        return m;
      }
    }
  }

  public messageToMessageForUpdate(message: MessageDto): MessageForUpdate {
    let m: MessageForUpdate = new MessageForUpdate();
    m.message = message.message;
    m.id = message.id;
    return m;
  }

  public updateListMessage(list: Array<MessageDto>, message: MessageDto): void {
    for (let i = 0; i < list.length; i++) {
      let el: MessageDto = list[i];
      if (el.id === message.id) {
        list[i] = message;
        break;
      }
    }
  }

  public findChannelInListById(id: number, list: Array<ChannelDto>): ChannelDto {
    for (let m of list) {
      if (m.id == id) {
        return m;
      }
    }
  }

  public findIndexChannelInListById(id: number, list: Array<ChannelDto>): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        return i;
      }
    }
  }

}

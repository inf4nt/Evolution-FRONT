import {Component, Input, OnInit} from '@angular/core';
import {MessageForSave} from "../../../model/message-for-save.model";
import {User} from "../../../model/user.model";
import {Message} from "../../../model/message.model";
import {maxListMessageLength} from "../../../common/const";
import {MessageRestService} from "../../../service/rest/message-rest.service";

declare var NProgress: any;

@Component({
  selector: 'app-message-post',
  templateUrl: './message-post.component.html',
  styleUrls: ['./message-post.component.css']
})
export class MessagePostComponent implements OnInit {

  @Input()
  private recipient: User = new User();

  @Input()
  private sender: User = new User();

  @Input()
  private listMessage: Array<Message> = [];

  messagePost: MessageForSave = new MessageForSave();

  constructor(private messageDataService: MessageRestService) {}

  ngOnInit() {
  }

  postMessage(): void {
    if (this.messagePost.text.length > 0) {
      NProgress.start();
      this.messagePost
        .senderId = this.sender.id;
      this.messagePost
        .recipientId = this.recipient.id;

      this.messageDataService
        .postMessage(this.messagePost)
        .subscribe(data => {
          if (data) {
            this.listMessage.push(data);
            if (this.listMessage.length >= maxListMessageLength) {
              this.listMessage.splice(0, 1);
            }
          }
          NProgress.done();
        });

    }
    this.messagePost = new MessageForSave();
  }

}

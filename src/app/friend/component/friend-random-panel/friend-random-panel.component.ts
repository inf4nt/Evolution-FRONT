import {Component, Input, OnInit} from '@angular/core';
import {Friend} from "../../../model/friend.model";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-friend-random-panel',
  templateUrl: './friend-random-panel.component.html',
  styleUrls: ['./friend-random-panel.component.css']
})
export class FriendRandomPanelComponent implements OnInit {

  @Input()
  pageFriends: Page<Friend> = new Page<Friend>();

  constructor() {
  }

  ngOnInit() {
  }

}

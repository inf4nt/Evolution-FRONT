import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {FriendActionsComponent} from "./component/friend-actions/friend-actions.component";
import {FriendRandomPanelComponent} from "./component/friend-random-panel/friend-random-panel.component";
import {FriendListComponent} from "./component/friend-list/friend-list.component";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    FriendActionsComponent,
    FriendRandomPanelComponent,
  ],
  declarations: [
    FriendActionsComponent,
    FriendRandomPanelComponent,
    FriendListComponent,
  ]
})
export class FriendModule { }

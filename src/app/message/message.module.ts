import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelListComponent } from './component/channel-list/channel-list.component';
import { DirectMessageUserListComponent } from './component/direct-message-user-list/direct-message-list.component';
import { ChannelCreateComponent } from './component/channel-create/channel-create.component';
import { ChannelSearchComponent } from './component/channel-search/channel-search.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { ChannelComponent } from './component/channel/channel.component';
import { MessageInDialogComponent } from './component/dialog-message/dialog-message.component';
import { ChannelMessageListComponent } from './component/channel-message-list/channel-message-list.component';

const appRoutes: Routes = [
  {path: 'channel', component: ChannelComponent,
    children: [
      {
        path: 'dialog/:dialogId/user/:userId',
        component: MessageInDialogComponent,
        outlet: 'channel-router'
      },
      {
        path: ':id/name/:name',
        component: ChannelMessageListComponent,
        outlet: 'channel-router'
      },
    ]},
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    ChannelListComponent,
    DirectMessageUserListComponent,
    ChannelCreateComponent,
    ChannelSearchComponent,
    ChannelComponent,
    MessageInDialogComponent,
    ChannelMessageListComponent,
  ]
})
export class MessageModule { }

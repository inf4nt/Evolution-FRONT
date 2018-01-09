import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelCreateComponent } from './component/channel-create/channel-create.component';
import { ChannelSearchComponent } from './component/channel-search/channel-search.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { ChannelComponent } from './component/channel/channel.component';
import { MessageInDialogComponent } from './component/dialog-message/dialog-message.component';
import { ChannelMessageComponent } from './component/channel-message/channel-message.component';
import { DirectMessageComponent } from './component/direct-message/direct-message.component';
import { DirectChannelComponent } from './component/direct-channel/direct-channel.component';
import { ChannelActionComponent } from './component/channel-action/channel-action.component';
import { ChannelAddUserComponent } from './component/channel-add-user/channel-add-user.component';
import {UserListComponent} from "../user/component/user-list/user-list.component";
import {UserModule} from "../user/user.module";
import {NgxPaginationModule} from "ngx-pagination";
import { ChannelUserComponent } from './component/channel-user/channel-user.component';

const appRoutes: Routes = [
  {path: 'channel', component: ChannelComponent,
    children: [
      // {
      //   path: 'dialog/:dialogId/user/:userId',
      //   component: MessageInDialogComponent,
      //   outlet: 'channel-router'
      // },
      {
        path: 'dialog-by-user/:userId',
        component: MessageInDialogComponent,
        outlet: 'channel-router'
      },
      {
        path: ':id/name/:name',
        component: ChannelMessageComponent,
        outlet: 'channel-router'
      },
      {
        path: 'create-channel',
        component: ChannelCreateComponent,
        outlet: 'channel-router'
      },
      {
        path: 'channel-add-user/:channelId/:channelName',
        component: ChannelAddUserComponent,
        outlet: 'channel-router'
      },
      {
        path: 'channel-search',
        component: ChannelSearchComponent,
        outlet: 'channel-router'
      },
      {
        path: 'channel-user/:channelId/:channelName',
        component: ChannelUserComponent,
        outlet: 'channel-router'
      },
    ]},
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    ChannelCreateComponent,
    ChannelSearchComponent,
    ChannelComponent,
    MessageInDialogComponent,
    ChannelMessageComponent,
    DirectMessageComponent,
    DirectChannelComponent,
    ChannelActionComponent,
    ChannelAddUserComponent,
    ChannelUserComponent,
  ]
})
export class MessageModule { }

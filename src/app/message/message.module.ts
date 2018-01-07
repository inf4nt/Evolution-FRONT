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
        component: ChannelMessageComponent,
        outlet: 'channel-router'
      },
      {
        path: 'create-channel',
        component: ChannelCreateComponent,
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
    ChannelCreateComponent,
    ChannelSearchComponent,
    ChannelComponent,
    MessageInDialogComponent,
    ChannelMessageComponent,
    DirectMessageComponent,
    DirectChannelComponent,
    ChannelActionComponent,
  ]
})
export class MessageModule { }

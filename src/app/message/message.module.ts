import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelListComponent } from './component/channel-list/channel-list.component';
import { DirectMessageListComponent } from './component/direct-message-list/direct-message-list.component';
import { ChannelCreateComponent } from './component/channel-create/channel-create.component';
import { ChannelSearchComponent } from './component/channel-search/channel-search.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { ChannelComponent } from './component/channel/channel.component';
import {UserEditComponent} from "../user/component/user-edit/user-edit.component";
import {UserPasswordEditComponent} from "../user/component/user-password-edit/user-password-edit.component";
import {UserSecurityComponent} from "../user/component/user-security/user-security.component";

const appRoutes: Routes = [
  {path: 'channel', component: ChannelComponent, children: [
      // {path: 'edit', component: UserEditComponent, outlet: 'user-profile'},
      // {path: 'edit-password', component: UserPasswordEditComponent, outlet: 'user-profile'},
      // {path: 'edit-security', component: UserSecurityComponent, outlet: 'user-profile'},
    ]},
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [ChannelListComponent, DirectMessageListComponent, ChannelCreateComponent, ChannelSearchComponent, ChannelComponent]
})
export class MessageModule { }

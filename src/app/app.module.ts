import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './security/component/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DataTransfer} from './service/data-transfer.service';
import {IsAuthGuard} from './guard/is-auth-guard';
import {FriendListComponent} from './friend/component/friend-list/friend-list.component';
import {DialogUserListComponent} from './components/message-dialog/dialog-user-list/dialog-user-list.component';
import {MessagePostComponent} from './components/message-dialog/message-post/message-post.component';
import {DialogMessageComponent} from './components/message-dialog/dialog-message/dialog-message.component';
import {TechnicalService} from './service/technical.service';
import {FeedDataService} from './service/data/feed-data.service';
import {UserDataService} from './service/data/user-data.service';
import {FriendDataService} from './service/data/friend-data.service';
import {MessageDataService} from "./service/data/message-data.service";
import {JwtTokenInterceptor} from "./interceptor/jwt-token.interceptor";
import {ResponseStatusInterceptor} from "./interceptor/response-status.interceptor";
import { Status403Component } from './components/error/status-403/status-403.component';
import { Status204Component } from './components/error/status-204/status-204.component';
import {UserModule} from "./user/user.module";
import {SharedModule} from "./shared/shared.module";
import {SecurityModule} from "./security/security.module";
import {UserListComponent} from "./user/component/user-list/user-list.component";
import {FriendModule} from "./friend/friend.module";
import {FeedModule} from "./feed/feed.module";
import { Status500Component } from './components/error/status-500/status-500.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'user-list', component: UserListComponent, canActivate: [IsAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'friend/user/:id/:status', component: FriendListComponent, canActivate: [IsAuthGuard]},
  {path: 'dialog', component: DialogUserListComponent, canActivate: [IsAuthGuard]},
  {path: 'message/interlocutor/:interlocutor', component: DialogMessageComponent, canActivate: [IsAuthGuard]},
  {path: 'status-403', component: Status403Component},
  {path: 'status-204', component: Status204Component},
  {path: 'status-500', component: Status500Component},
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DialogUserListComponent,
    DialogMessageComponent,
    MessagePostComponent,
    Status403Component,
    Status204Component,
    Status500Component,
  ],
  imports: [
    SharedModule,
    SecurityModule,
    UserModule,
    FriendModule,
    FeedModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseStatusInterceptor,
      multi: true
    },
    DataTransfer,
    UserDataService,
    FeedDataService,
    IsAuthGuard,
    TechnicalService,
    FriendDataService,
    MessageDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

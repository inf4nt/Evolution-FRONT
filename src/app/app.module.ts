import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormGroup, FormsModule} from '@angular/forms';
import {LoginComponent} from './security/login/login.component';
import {AuthenticationService} from './security/authentication.service';
import {HttpModule} from '@angular/http';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {FriendsComponent} from './components/friends/friends.component';
import {RegistrationComponent} from './components/user/user-registration/registration.component';
import {FriendService} from './service/rest/friend.service';
import {UserService} from './service/rest/user.service';
import {FeedService} from './service/rest/feed.service';
import {DataTransfer} from './service/data-transfer.service';
import {MessageService} from './service/rest/message.service';
import {IsAuthGuard} from './guard/is-auth-guard';
import {RestErrorService} from './service/rest/rest-error.service';
import {NoContentComponent} from './components/no-content/no-content.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {FeedListComponent} from "./components/feed/feed-list/feed-list.component";
import {FeedPostComponent} from "./components/feed/feed-post/feed-post.component";
import {FriendActionsComponent} from "./components/friend/friend-actions/friend-actions.component";
import {UserHomeComponent} from "./components/user/user-home/user-home.component";
import {UserSettingsComponent} from "./components/user/user-settings/user-settings.component";
import {FriendListComponent} from "./components/friend/friend-list/friend-list.component";
import {DialogUserListComponent} from "./components/message-dialog/dialog-user-list/dialog-user-list.component";
import {MessagePostComponent} from "./components/message-dialog/message-post/message-post.component";
import {DialogMessageComponent} from "./components/message-dialog/dialog-message/dialog-message.component";
import {TechnicalService} from "./service/technical.service";


const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'friend/user/:id/:status', component: FriendListComponent, canActivate: [IsAuthGuard]},
  {path: 'dialog', component: DialogUserListComponent, canActivate: [IsAuthGuard]},
  {path: 'message/interlocutor/:interlocutor', component: DialogMessageComponent, canActivate: [IsAuthGuard]},
  {path: 'user-home/:id', component: UserHomeComponent, pathMatch: 'full', canActivate: [IsAuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'actionStatus/204', component: NoContentComponent},
  {path: 'user-list', component: UserListComponent, canActivate: [IsAuthGuard]},
  {path: 'user-settings', component: UserSettingsComponent, canActivate: [IsAuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    FriendsComponent,
    UserHomeComponent,
    RegistrationComponent,
    NoContentComponent,
    UserListComponent,
    UserSettingsComponent,
    FeedListComponent,
    FeedPostComponent,
    FriendListComponent,
    FriendActionsComponent,
    DialogUserListComponent,
    DialogMessageComponent,
    MessagePostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule],
  providers: [
    AuthenticationService,
    DataTransfer,
    FriendService,
    UserService,
    FeedService,
    MessageService,
    IsAuthGuard,
    TechnicalService,
    RestErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

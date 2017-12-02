import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormGroup, FormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationService} from './service/authentication.service';
import {HttpModule} from '@angular/http';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {FriendsComponent} from './components/friends/friends.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {MessageComponent} from './components/message/message.component';
import {UserHomeComponent} from './components/user-home/user-home.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {FriendService} from './service/rest/friend.service';
import {UserService} from './service/rest/user.service';
import {FeedService} from './service/rest/feed.service';
import {DataTransfer} from './service/data-transfer.service';
import {MessageService} from './service/rest/message.service';
import {IsAuthGuard} from './guard/is-auth-guard';
import {RestErrorService} from './service/rest/rest-error.service';
import {NoContentComponent} from './components/no-content/no-content.component';
import {UserSearchComponent} from './components/user-search/user-search.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'friend/user/:id/:status', component: FriendsComponent, canActivate: [IsAuthGuard]},
  {path: 'dialog', component: DialogComponent, canActivate: [IsAuthGuard]},
  {path: 'message/interlocutor/:interlocutor', component: MessageComponent, canActivate: [IsAuthGuard]},
  {path: 'user-home/:id', component: UserHomeComponent, pathMatch: 'full', canActivate: [IsAuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'search-user', component: UserSearchComponent},
  {path: 'actionStatus/204', component: NoContentComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    FriendsComponent,
    DialogComponent,
    MessageComponent,
    UserHomeComponent,
    RegistrationComponent,
    NoContentComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule],
  providers: [AuthenticationService, DataTransfer, FriendService, UserService, FeedService, MessageService, IsAuthGuard, RestErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

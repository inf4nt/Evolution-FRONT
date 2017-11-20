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
import { RegistrationComponent } from './components/registration/registration.component';



const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'friend/user/:id/:status', component: FriendsComponent},
  {path: 'dialog', component: DialogComponent},
  {path: 'message/dialog/:dialogId/recipient/:recipientId', component: MessageComponent},
  {path: 'user-home/:id', component: UserHomeComponent, pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent},
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

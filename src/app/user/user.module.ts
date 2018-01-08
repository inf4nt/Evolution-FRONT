import {NgModule} from '@angular/core';
import {UserCreateComponent} from "./component/user-create/user-create.component";
import {UserEditComponent} from "./component/user-edit/user-edit.component";
import {UserListComponent} from "./component/user-list/user-list.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {UserHomeComponent} from "./component/user-home/user-home.component";
import {FriendModule} from "../friend/friend.module";
import {FeedModule} from "../feed/feed.module";
import {RegistrationComponent} from "./component/user-registration/registration.component";
import {NgxPaginationModule} from "ngx-pagination";
import {UserPasswordEditComponent} from "./component/user-password-edit/user-password-edit.component";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import { UserSecurityComponent } from './component/user-security/user-security.component';

const appRoutes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'registration', component: RegistrationComponent, pathMatch: 'full'},
  {path: 'user-home/:id', component: UserHomeComponent},
  {path: 'user-profile', component: UserProfileComponent, children: [
      {path: 'edit', component: UserEditComponent, outlet: 'user-profile'},
      {path: 'edit-password', component: UserPasswordEditComponent, outlet: 'user-profile'},
      {path: 'edit-security', component: UserSecurityComponent, outlet: 'user-profile'},
    ]},

];

@NgModule({
  imports: [
    SharedModule,
    FriendModule,
    FeedModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    UserHomeComponent,
  ],
  declarations: [
    UserCreateComponent,
    UserEditComponent,
    RegistrationComponent,
    UserListComponent,
    UserHomeComponent,
    UserPasswordEditComponent,
    UserProfileComponent,
    UserSecurityComponent,
  ]
})
export class UserModule {
}

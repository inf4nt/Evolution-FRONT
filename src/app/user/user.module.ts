import {NgModule} from '@angular/core';
import {UserCreateComponent} from "./component/user-create/user-create.component";
import {UserEditComponent} from "./component/user-edit/user-edit.component";
import {UserListComponent} from "./component/user-list/user-list.component";
import {RouterModule, Routes} from "@angular/router";
import {IsAuthGuard} from "../guard/is-auth-guard";
import {SharedModule} from "../shared/shared.module";
import {UserHomeComponent} from "./component/user-home/user-home.component";
import {UserSettingsComponent} from "./component/user-settings/user-settings.component";
import {FeedPostComponent} from "../feed/component/feed-post/feed-post.component";
import {FeedListComponent} from "../feed/component/feed-list/feed-list.component";
import {FriendModule} from "../friend/friend.module";
import {FeedModule} from "../feed/feed.module";
import {RegistrationComponent} from "./component/user-registration/registration.component";
import {NgxPaginationModule} from "ngx-pagination";

const appRoutes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'registration', component: RegistrationComponent, pathMatch: 'full'},
  {path: 'user-home/:id', component: UserHomeComponent},
  {path: 'user-settings', component: UserSettingsComponent},
];

@NgModule({
  imports: [
    SharedModule,
    FriendModule,
    FeedModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
  ],
  exports: [
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    UserSettingsComponent,
    UserHomeComponent,
  ],
  declarations: [
    UserCreateComponent,
    UserEditComponent,
    RegistrationComponent,
    UserListComponent,
    UserSettingsComponent,
    UserHomeComponent
  ]
})
export class UserModule {
}

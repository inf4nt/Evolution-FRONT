import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {NotesListComponent} from "./notes-list/notes-list.component";
import {UserListComponent} from "../user/component/user-list/user-list.component";
import {RegistrationComponent} from "../user/component/user-registration/registration.component";
import {UserProfileComponent} from "../user/component/user-profile/user-profile.component";
import {UserPasswordEditComponent} from "../user/component/user-password-edit/user-password-edit.component";
import {UserEditComponent} from "../user/component/user-edit/user-edit.component";
import {UserSecurityComponent} from "../user/component/user-security/user-security.component";
import {RouterModule, Routes} from "@angular/router";
import {UserHomeComponent} from "../user/component/user-home/user-home.component";
import {NotesActionComponent} from './notes-action/notes-action.component';
import {NotesRestService} from "../service/rest/notes-rest.service";

const appRoutes: Routes = [
  {
    path: 'notes', component: NotesActionComponent, children: [
      {path: 'notes-list', component: NotesListComponent, outlet: 'notes-outlet'},
    ]
  },

]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    NotesListComponent,
    NotesActionComponent,
  ]
})
export class NotesModule {
}

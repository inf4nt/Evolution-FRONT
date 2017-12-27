import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./component/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {EvolutionJwtTokenService} from "./jwt-token.service";



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    AuthenticationService,
    EvolutionJwtTokenService,
  ],
  declarations: [LoginComponent]
})
export class SecurityModule {
}

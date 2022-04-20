import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { SessionRoutes } from './session.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from "./../shared/shared.module"

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(SessionRoutes),
    SharedModule
  ]
})

export class SessionModule {

}

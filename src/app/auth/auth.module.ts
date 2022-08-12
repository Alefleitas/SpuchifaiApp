import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AuthRoutingModule
  ]
})
export class AuthModule { }

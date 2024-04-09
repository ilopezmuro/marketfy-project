import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { sessionGuard } from '../guards/session.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [sessionGuard]  },
  { path: 'login', component: LoginComponent, canActivate: [sessionGuard]  },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthUserRoutingModule { }

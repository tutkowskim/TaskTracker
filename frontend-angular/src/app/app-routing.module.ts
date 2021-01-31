import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DisabledUserGuard } from './auth/disabled-user.guard';
import { DisabledUserComponent } from './disabled-user/disabled-user.component';
import { ProfileComponent } from './profile/profile.component';

// When adding routes be sure to update routes.json, so that azure will allow direct navigation to it.
const routes: Routes = [
  { path: '', component: TasksComponent, canActivate: [DisabledUserGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'disabled-user', component: DisabledUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

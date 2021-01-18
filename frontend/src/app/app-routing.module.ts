import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { DisabledUserComponent } from './disabled-user/disabled-user.component';

// When adding routes be sure to update routes.json, so that azure will allow direct navigation to it.
const routes: Routes = [
  { path: '', component: TasksComponent, canActivate: [AuthGuardGuard] },
  { path: 'disabled-user', component: DisabledUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

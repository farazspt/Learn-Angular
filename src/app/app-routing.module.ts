import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailComponent } from './detail/detail.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGuard } from './auth.guard';
import { UnauthGuard } from './unauth.guard';

const routes: Routes = [
  {
    path: 'employee',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EmployeeComponent,
      },
      {
        path: 'add',
        component: AddEmployeeComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

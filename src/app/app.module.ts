import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EmployeeComponent,
    NotFoundComponent,
    DetailComponent,
    AddEmployeeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: EmployeeComponent,
      },
      {
        path: 'employee/:id',
        component: DetailComponent,
      },
      {
        path: 'add',
        component: AddEmployeeComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}

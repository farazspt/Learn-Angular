import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  detailForm!: FormGroup;
  credentials: any = {
    username: 'admin',
    password: 'indocyber',
  };
  minLength = 8;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.detailForm = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.minLength),
        ]),
      ],
    });
  }

  onSubmit() {
    const value = this.detailForm.getRawValue();
    if (
      !(
        value.username === this.credentials.username &&
        value.password === this.credentials.password
      )
    ) {
      this.errorMessage = 'Wrong username or password, please try again!';
      console.log(this.errorMessage);
      return;
    }

    this.errorMessage = undefined;
    localStorage.setItem(
      'token',
      'ini token dummy yang diciptakan secara hardcode'
    );

    setTimeout(() => {
      this.router.navigateByUrl('/employee');
    }, 300);
  }
}

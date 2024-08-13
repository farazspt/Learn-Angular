import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  groups: string[] = [
    'Frontend',
    'Backend',
    'UI/UX',
    'QA',
    'Fullstack',
    'Security',
    'Data Analyst',
    'Project Manager',
    'Trainee',
    'Database Admin',
  ];
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private service: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      birthdate: ['', Validators.compose([Validators.required])],
      basicSallary: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitForm() {
    // let employee = this.formGroup.getRawValue();

    let employee = {
      username: this.formGroup.get('username')?.value,
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      email: this.formGroup.get('email')?.value,
      birthDate: this.formatAndInsertBirthdate() as any as Date,
      basicSalary: this.formGroup.get('basicSallary')?.value,
      status: 1,
      group: this.formGroup.get('group')?.value,
      description: this.formGroup.get('description')?.value,
    };

    this.service.create(JSON.stringify(employee)).subscribe({
      next: (response) => {
        let postData = {
          ...employee,
          birthDate: this.formatAndInsertBirthdate(),
        };
        console.log(response);

        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cetaktanggal() {
    console.log(this.formatAndInsertBirthdate());
  }

  setMaxDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatAndInsertBirthdate() {
    let birthdate = this.formGroup.get('birthdate')?.value;
    const dateParts = birthdate.split('-');
    const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`; // Changing the format to MM/DD/YYYY

    return formattedDate;
  }
}

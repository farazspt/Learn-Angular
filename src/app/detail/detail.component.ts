import { Component, OnInit } from '@angular/core';
import { EmployeeClass, IEmployee } from '../employee/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  employee: IEmployee = new EmployeeClass();

  constructor(
    private activeRoute: ActivatedRoute,
    private service: EmployeeService
  ) {}

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');

    this.getEmployeeDetail(id);
  }

  getEmployeeDetail(id: any) {
    this.service.getById(id).subscribe({
      next: (response) => {
        this.employee = new EmployeeClass(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

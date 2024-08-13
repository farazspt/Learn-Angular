import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeClass } from './employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  keywordFilter: string = '';
  employees: EmployeeClass[] = [];
  employeeList: EmployeeClass[] = [];
  pageNumber: number = 1;
  tableSize: number = 10;
  totalPage: number = 10;
  isUsernameAscending: boolean = false;
  isNameAscending: boolean = false;
  isGroupnameAscending: boolean = false;

  constructor(private service: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.fillEmployee();
  }
  fillEmployee() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.employeeList = (response as any[]).map((emp) => {
          return new EmployeeClass(emp);
        });

        this.employees = this.employeeList;
        this.totalPage = Math.ceil(this.employeeList.length / this.tableSize);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getAllEmployees() {
    return this.employees.slice(
      (this.pageNumber - 1) * this.tableSize,
      this.tableSize * this.pageNumber
    );
  }

  filterEmployee() {
    this.employees = this.employeeList.filter(
      (emp) =>
        emp.username
          .toLowerCase()
          .includes(this.keywordFilter.toLocaleLowerCase()) ||
        emp
          .getFullName()
          .toLowerCase()
          .includes(this.keywordFilter.toLowerCase()) ||
        emp.group.toLowerCase().includes(this.keywordFilter.toLowerCase())
    );
    this.totalPage = Math.ceil(this.employees.length / this.tableSize);
    this.pageNumber = 1;
  }

  changePageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  sortByUsername() {
    this.isUsernameAscending = !this.isUsernameAscending;
    if (this.isUsernameAscending) {
      this.employees.sort((a, b) => a.username.localeCompare(b.username));
    } else {
      this.employees.sort((a, b) => b.username.localeCompare(a.username));
    }
  }

  sortByFullname() {
    this.isNameAscending = !this.isNameAscending;

    if (this.isNameAscending) {
      this.employees.sort((a, b) =>
        a.getFullName().localeCompare(b.getFullName())
      );
    } else {
      this.employees.sort((a, b) =>
        b.getFullName().localeCompare(a.getFullName())
      );
    }
  }

  sortByGroup() {
    this.isGroupnameAscending = !this.isGroupnameAscending;

    if (this.isGroupnameAscending) {
      this.employees.sort((a, b) => a.group.localeCompare(b.group));
    } else {
      this.employees.sort((a, b) => b.group.localeCompare(a.group));
    }
  }

  resetTotalPage() {
    this.pageNumber = 1;
    this.totalPage = Math.ceil(this.employees.length / this.tableSize);
  }

  logOut() {
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
  }

  showAlert(button: string) {
    alert(`Success ${button}`);
  }
}

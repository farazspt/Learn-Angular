export interface IEmployee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: number;
  group: string;
  description: string;
}

export class EmployeeClass implements IEmployee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: number;
  group: string;
  description: string;

  constructor(model?: any) {
    model = model || {};
    this.id = model.id;
    this.username = model.username;
    this.firstName = model.firstName;
    this.lastName = model.lastName || null;
    this.email = model.email;
    this.birthDate = model.birthDate;
    this.basicSalary = model.basicSalary || null;
    this.status = model.status;
    this.group = model.group;
    this.description = model.description;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

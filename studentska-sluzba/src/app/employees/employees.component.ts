import { Component, OnInit } from '@angular/core';
import {Employee} from './employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  employees: Employee[] = [
    {name: 'asd', surname: 'asd', dateOfBirth: new Date(1970, 4, 1), dateOfEnrollment: new Date(2016, 0, 1), title: 'Profesor'},
    {name: 'dfg', surname: 'dasdasdfg', dateOfBirth: new Date(1970, 4, 1), dateOfEnrollment: new Date(2015, 0, 1), title: 'Referada'}
  ];

  ngOnInit(): void {
  }

}

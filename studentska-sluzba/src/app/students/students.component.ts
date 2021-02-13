import { Component, OnInit } from '@angular/core';
import {Student} from './student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor() { }

  students: Student[] = [
    {name: 'asd', surname: 'asd', dateOfBirth: new Date(1999, 11, 7), course: 'Racunalstvo', dateOfEnrollment: new Date(2018, 9, 1)},
    {name: 'fgh', surname: 'fgh', dateOfBirth: new Date(1998, 11, 7), course: 'Informatika', dateOfEnrollment: new Date(2019, 9, 1)},
    {name: 'tzu', surname: 'tzu', dateOfBirth: new Date(1999, 11, 7), course: 'Racunalstvo', dateOfEnrollment: new Date(2020, 9, 1)},
  ];

  ngOnInit(): void {
    this.students.forEach((s) => {
      const curYear = new Date();
      s.yearsEnrolled = curYear.getFullYear() - s.dateOfEnrollment.getFullYear();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {Student} from './student.model';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Course} from "./course.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  students: Student[];
  adding: boolean;
  studentForm: FormGroup;
  isAdmin: boolean;
  courses: Course[];

  ngOnInit(): void {
    this.http.get('api/students').subscribe((res: {status: string, students: Student[]}) => {
      this.students = res.students;

      this.students.forEach((s) => {
        const curYear = new Date();
        s.yearsEnrolled = curYear.getFullYear() - s.dateOfEnrollment.getFullYear();
      });
    });

    this.http.get('/curriculum/courses').subscribe( (res: {status: string, courses: Course[]}) => {
      this.courses = res.courses;
    });

    this.adding = false;

    document.getElementById('addStudent').addEventListener('click', () => {
      this.adding = !this.adding;
    });

    this.studentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required)
    });

    this.isAdmin = this.auth.getUser().admin;
  }

  addStudent(){
    let student = {
      name: this.studentForm.get('name').value,
      surname: this.studentForm.get('surname').value,
      dateOfBirth: new Date(this.studentForm.get('dateOfBirth').value),
      course: this.studentForm.get('course').value,
      dateOfEnrollment: new Date()
    };
    this.http.post('api/students', {s: student}).subscribe( (res: {status: string, insertId: string}) => {
      console.log(res);
      let attribute = 'id'; //avoid waarnings
      student[attribute] = res.insertId;
      this.students.push(student);
    });
  }

  deleteStudent(i){
    let obj = this.students[i];
    this.http.delete(`/api/students/${obj.id}`).subscribe( res => {
      console.log(res);
    });
  }
}

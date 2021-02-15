import { Component, OnInit } from '@angular/core';
import {Student} from './student.model';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Course} from './course.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  students: Student[];
  adding: boolean;
  studentForm: FormGroup;
  isAdmin: boolean;
  courses: Course[];
  shownStudents: Student[];

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required)
    });

    this.http.get('api/students').subscribe((res: {status: string, students: Student[]}) => {
      this.students = res.students;
      this.shownStudents = this.students;

      this.students.forEach((s) => {
        const curYear = new Date();
        const enrolledYear = new Date(s.dateOfEnrollment);
        s.yearsEnrolled = curYear.getFullYear() - enrolledYear.getFullYear() + 1;
      });
    });

    this.http.get('/curriculum/courses').subscribe( (res: {status: string, courses: Course[]}) => {
      this.courses = res.courses;
      this.studentForm.get('course').setValue(this.courses[0].name);
    });

    this.adding = false;

    document.getElementById('addStudent').addEventListener('click', () => {
      this.adding = !this.adding;
    });

    this.isAdmin = this.auth.getUser().admin;
  }

  addStudent(){
    console.log(this.studentForm.get('dateOfBirth').value);
    let student = {
      name: this.studentForm.get('name').value,
      surname: this.studentForm.get('surname').value,
      dateOfBirth: new Date(this.studentForm.get('dateOfBirth').value),
      course: this.studentForm.get('course').value,
      dateOfEnrollment: new Date()
    };
    this.http.post('api/students', {s: student}).subscribe( (res: {status: string, insertId: string}) => {
      console.log(res);
      let attribute = '_id'; //avoid waarnings
      student[attribute] = res.insertId;
      attribute = 'yearsEnrolled';
      student[attribute] = 1;
      this.students.push(student);
      this.shownStudents = this.students;
    });
  }

  editStudent(i){
    this.router.navigate([`${this.students[i]._id}`]);
  }

  deleteStudent(i){
    let obj = this.students[i];
    console.log(obj);
    this.http.delete(`/api/students/${obj._id}`).subscribe( res => {
      console.log(res);
      this.students.splice(i, 1);
      this.shownStudents = this.students;
    });
  }

  search(){
    this.shownStudents = this.students.filter( e => e.name.toLowerCase().includes((document.getElementById('param') as HTMLInputElement).value.toLowerCase())
      || e.surname.toLowerCase().includes((document.getElementById('param') as HTMLInputElement).value.toLowerCase()));
  }
}

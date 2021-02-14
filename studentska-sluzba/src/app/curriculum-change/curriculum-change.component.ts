import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Class} from '../news/classes.model';
import {Course} from '../students/course.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-curriculum-change',
  templateUrl: './curriculum-change.component.html',
  styleUrls: ['./curriculum-change.component.css']
})
export class CurriculumChangeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  changingCourses: boolean;
  changingClasses: boolean;

  classForm: FormGroup;
  courseForm: FormGroup;

  classes: Class[];
  courses: Course[];

  ngOnInit(): void {
    this.classForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required)
    });

    this.courseForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.http.get('/curriculum/courses').subscribe( (res: {status: string, courses: Course[]}) => {
      this.courses = res.courses;
      console.log(res);
      this.classForm.get('course').setValue(this.courses[0].name);
    });

    this.changingClasses = false;
    this.changingClasses = false;
  }

  addingCourse(){
    this.changingCourses = !this.changingCourses;
    this.changingClasses = false;
  }
  addCourse(){
    const course = {
      name: this.courseForm.get('name').value
    };
    this.http.post('/curriculum/courses', {c: course}).subscribe( res => {
      console.log(res);
      this.courses.push(course);
    });
  }

  editCourse(){

  }

  deleteCourse(){

  }

  addingClass(){
    this.changingClasses = !this.changingClasses;
    this.changingCourses = false;
  }

  addClass(){
    const cl = {
      name: this.classForm.get('name').value,
      course: this.classForm.get('course').value
    };
    this.http.post('/curriculum/classes', {c: cl}).subscribe( res => {
      console.log(res);
      this.classes.push(cl);
    });
  }

  editClass(){

  }

  deleteClass(){

  }
}

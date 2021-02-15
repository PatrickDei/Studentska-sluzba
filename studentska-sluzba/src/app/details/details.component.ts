import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Student} from '../students/student.model';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  objectID : string;
  student: Student;
  editForm: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe( (p: Params) => {
      this.objectID = p.id;
    });

    this.editForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required),
      dateOfEnrollment: new FormControl(null, Validators.required),
    });

    this.http.get(`/api/students/${this.objectID}`).subscribe((res: {status: string, student: Student[]}) => {
      this.student = res.student[0];
      console.log(this.student);

      const curYear = new Date();
      const enrolledYear = new Date(this.student.dateOfEnrollment);
      this.student.yearsEnrolled = curYear.getFullYear() - enrolledYear.getFullYear() + 1;

      this.editForm.get('name').setValue(this.student.name);
      this.editForm.get('surname').setValue(this.student.surname);
      this.editForm.get('dateOfBirth').setValue(this.toFormDate(new Date(this.student.dateOfBirth)));
      this.editForm.get('course').setValue(this.student.course);
      this.editForm.get('dateOfEnrollment').setValue(this.toFormDate(new Date(this.student.dateOfEnrollment)));
    });
  }

  saveChanges(){
    const stud = {
      id: this.student._id,
      name: this.editForm.get('name').value,
      surname: this.editForm.get('surname').value,
      dateOfBirth: new Date(this.editForm.get('dateOfBirth').value),
      course: this.editForm.get('course').value,
      dateOfEnrollment: new Date(this.editForm.get('dateOfEnrollment').value),
    };

    this.http.put('/api/students', {s: stud}).subscribe( (res: {status: string, changes: Object}) => console.log(res));
  }

  toFormDate(dateTime: Date){
    let formattedDateTime = '';
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    formattedDateTime += dateTime.getFullYear() + '-';
    formattedDateTime += ((month < 10) ? '0' : '') + month + '-';
    formattedDateTime += ((day < 10) ? '0' : '') +  day + 'T';
    formattedDateTime += ((hours < 10) ? '0' : '') + hours + ':';
    formattedDateTime += ((minutes < 10) ? '0' : '') + minutes;

    return formattedDateTime;
  }
}

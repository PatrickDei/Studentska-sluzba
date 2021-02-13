import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  registerForm: FormGroup;
  isAdmin;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.compose([Validators.email, Validators.required])),
      username: new FormControl(null, Validators.minLength(4)),
      confirmPass: new FormControl(null, Validators.required)
    });
    this.isAdmin = document.getElementById('isAdmin');
  }

  addUser() {
    if (this.registerForm.get('password').value == this.registerForm.get('confirmPass').value) {
      const newUser = {
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
        email: this.registerForm.get('email').value,
        name: this.registerForm.get('name').value,
        admin: this.isAdmin.checked
      };
      this.http.post('/api/users', {u: newUser}).subscribe(res => {
        console.log(res);
      });
    }
  }
}

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
  nameWarning;
  passWarning;
  confirmPassWarning;
  emailWarning;
  usernameWarning;

  ngOnInit(): void {

    this.nameWarning = document.getElementById('nameWarning');
    this.passWarning = document.getElementById('passWarning');
    this.confirmPassWarning = document.getElementById('confirmPassWarning');
    this.emailWarning = document.getElementById('emailWarning');
    this.usernameWarning = document.getElementById('usernameWarning');

    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.compose([Validators.email, Validators.required])),
      username: new FormControl(null, Validators.minLength(4)),
      confirmPass: new FormControl(null, Validators.required)
    }, {updateOn: 'blur'});

    this.isAdmin = document.getElementById('isAdmin');

    this.registerForm.valueChanges.subscribe( value => {
      (this.registerForm.get('name').valid) ? this.nameWarning.innerHTML = '' : this.nameWarning.innerHTML = 'Potrebno je ispuniti';
      (this.registerForm.get('username').valid) ? this.usernameWarning.innerHTML = '' : this.usernameWarning.innerHTML = 'Potrebno je ispuniti sa barem 4 znaka';
      (this.registerForm.get('email').valid) ? this.emailWarning.innerHTML = '' : this.emailWarning.innerHTML = 'Mora biti e-mail adresa';
      (this.registerForm.get('password').valid) ? this.passWarning.innerHTML = '' : this.passWarning.innerHTML = 'Potrebno je ispuiti';
      (this.registerForm.get('confirmPass').valid) ? this.confirmPassWarning.innerHTML = '' : this.confirmPassWarning.innerHTML = 'Potrebno je ispuniti';
    });
  }

  addUser() {
    if (this.registerForm.get('password').value == this.registerForm.get('confirmPass').value) {
      if (this.registerForm.valid) {
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
    }else{
      this.confirmPassWarning.innerHTML = 'The 2 passwords should match';
    }
  }
}

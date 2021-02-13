import {Injectable, NgModule} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from './user.model';

@NgModule()
export class AuthService {
  private user: User;
  errorEmitter: Subject<string> = new Subject<string>();
  authChange: Subject<boolean> = new Subject<boolean>();
  private users: User[] = null;

  constructor(private http: HttpClient, private router: Router) {}

  async login(credentials: { username: string, password: string }) {
    await this.http.get('/api/users').subscribe((res: { status: string, users: User[] }) => {
      console.log(res);
      this.users = res.users;

      new Observable(observer => {
        let u = this.users.find(us => us.username == credentials.username && us.password == credentials.password);
        observer.next(u);
      }).subscribe((user: User) => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authChange.next(true);
          this.router.navigate(['/']);
        }
      });
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.user != null;
  }

  getUser() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return {...this.user};
  }
}

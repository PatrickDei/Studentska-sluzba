import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {NewsComponent} from './news/news.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {CurriculumChangeComponent} from './curriculum-change/curriculum-change.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {path: '', component: StudentsComponent},
  {path: 'news', component: NewsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'curriculum-change', component: CurriculumChangeComponent},
  {path: ':id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

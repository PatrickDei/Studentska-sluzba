import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {News} from './news.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Class} from './classes.model';

@Component({
  selector: 'app-employees',
  templateUrl: './news.component.html',
  styleUrls: ['./news.css']
})
export class NewsComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  news: News[];
  adding: boolean;
  newsForm: FormGroup;
  isAdmin: boolean;
  classes: Class[];
  opt;

  ngOnInit(): void {
    this.newsForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      dateOfExpire: new FormControl(null, Validators.required),
      class: new FormControl(null, Validators.required)
    });

    this.http.get('/news').subscribe((res: {status: string, news: News[]}) => {
      this.news = res.news;

      let now = new Date();
      this.news = this.news.filter( e => {
        console.log(e.dateOfExpiration);
        console.log(now);
        console.log('Passed check: ' + (e.dateOfExpiration >= now));
        return e.dateOfExpiration >= now;
      });
    });

    this.http.get('/curriculum/classes').subscribe( (res: {status: string, classes: Class[]}) => {
      this.classes = res.classes;
      this.newsForm.get('class').setValue(this.classes[0].name);
    });

    this.isAdmin = this.auth.getUser().admin;

    this.adding = false;
    document.getElementById('addNews').addEventListener('click', () => {
      this.adding = !this.adding;
    });
  }

  postNews(){
    const news = {
      title: this.newsForm.get('title').value,
      text: this.newsForm.get('text').value,
      dateOfExpiration: new Date(this.newsForm.get('dateOfExpire').value),
      datePublished: new Date(),
      class: this.newsForm.get('class').value
    };
    this.http.post('/news', {n: news}).subscribe( (res: {status: string, insertId: string}) => {
      console.log(res);
      let attribute = '_id'; //to avoid warnings
      news[attribute] = res.insertId;
      this.news.push(news);
    });
  }

  deleteNews(i){
    const obj = this.news[i];
    this.http.delete(`/news/${obj._id}`).subscribe( res => {
      console.log(res);
      this.news.splice(i, 1);
    });
  }
}

import {Class} from './classes.model';

export class News{
  _id?: string;
  title: string;
  text: string;
  datePublished: Date;
  dateOfExpiration: Date;
  class: Class;
}

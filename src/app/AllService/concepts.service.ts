import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConceptsService {

  constructor() { }
  public static Domain_Url="https://avicenna.pina-app.com/api/"

  static getHeader() : HttpHeaders
  {
    let contentHeader =new HttpHeaders().set('Accept', 'application/json');
    return contentHeader 
  }
  static getHeaderwithContentTkn():HttpHeaders{
    console.log(localStorage.getItem('token'))
    const contentHeaders = new HttpHeaders().append('Authorization',localStorage.getItem('token'));
    // contentHeaders.append('Authorization',localStorage.getItem('token'));
    return contentHeaders;
   }
  
}

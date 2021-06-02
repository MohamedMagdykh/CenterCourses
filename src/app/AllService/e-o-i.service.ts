import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { ConceptsService } from './concepts.service';
@Injectable({
  providedIn: 'root'
})
export class EOIService {

  constructor(private http: HttpClient,public toastr: ToastrManager,private router:Router) { }
  year() :Observable<any>
  {
    // const header = new HttpHeaders().append('Authorization', localStorage.getItem('token')); // may be localStorage/sessionStorage
    

 

    return this.http.get(ConceptsService.Domain_Url + 'years', {headers:ConceptsService.getHeader()}).pipe(
      map((res:any)=>
        {
       
          return res
        }),
        catchError((error: Response) => {
          // console.log("userData : ", error)

          return throwError(error);
        }),
        timeout(15000)
    )
  }

}

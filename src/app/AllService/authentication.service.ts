import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { ConceptsService } from './concepts.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,public toastr: ToastrManager,private router:Router) { }
  Register(data) :Observable<any>
  {
    return this.http.post( ConceptsService.Domain_Url + 'api/register',data,
    {
       headers:ConceptsService.getHeader()
    }).pipe(
      map(res=>
        {
          console.log(res)
          return res
        }),
        catchError((error: Response) => {
          // console.log("userData : ", error)

          return throwError(error);
        }),
        timeout(15000)
    )
  }

  LogIn(data) :Observable<any>
  {
    return this.http.post(ConceptsService.Domain_Url + 'api/login',data,
    {
       headers:ConceptsService.getHeader()
    }).pipe(
      map((res:any)=>
        {
          this.toastr.successToastr(res.message)
          setTimeout(() => {
            window.location.reload()
          }, 1500);
          
          // console.log(res)
         return res.data;

        }),
        catchError((error: Response) => {
          // console.log("userData : ", error)

          return throwError(error);
        })
       
    )
  }
  LogOut() :Observable<any>
  {
    // const header = new HttpHeaders().append('Authorization', localStorage.getItem('token')); // may be localStorage/sessionStorage
  
    return this.http.post(ConceptsService.Domain_Url + 'api/auth/logout',null, {headers:ConceptsService.getHeaderwithContentTkn()}).pipe(
      map((res:any)=>
        {
          this.toastr.successToastr(res.message)
          setTimeout(() => {
            window.location.reload()
          }, 1000);
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


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthenticationService } from './AllService/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AVICENNAACADEMY';
  checkLog = localStorage.getItem("login")
  NameUser = localStorage.getItem("NameUser")
  typeUser = localStorage.getItem("type")
  activiationCode
  constructor(public toastr: ToastrManager,private auth :AuthenticationService,private router:Router)
  {

  }
  ngOnInit(): void {

   this.checkLog = localStorage.getItem("login")
   console.log(this.checkLog)
  }
  log_Out()
  {
  
      this.auth.LogOut().subscribe(res=>
        {
          // console.log(res)
          
          localStorage.removeItem("actviation")  
          localStorage.removeItem("mail")
          localStorage.removeItem("type")
          localStorage.setItem("login","false")
          localStorage.removeItem("NameUser")
          localStorage.removeItem("token")
          this.checkLog = localStorage.getItem("login")
          setTimeout(() => {
            this.router.navigate(['']) 
          }, 500);
   
        },
        err=>
        {
          this.toastr.warningToastr(err.message)
        }
        ) 

   
  }
  
  


}

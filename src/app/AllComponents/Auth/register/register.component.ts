import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthenticationService } from 'src/app/AllService/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
 
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private auth :AuthenticationService,private router:Router) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      typeUser: ['3'],
      email: ['', [Validators.required, Validators.email,Validators.pattern('.*com$')]],
      phone:['', [Validators.required,Validators.pattern('[0-9]*')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {
    validator:this.MustMatch('password', 'confirmPassword')
    })
   }

  ngOnInit(): void {
    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
    if( localStorage.getItem("login")== "true"  )
    {
      this.router.navigate([''])
    }
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
  
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        
        if (control.errors && !control.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }
  
        // set error on matchingControl if validation fails
        console.log(control.value)
        console.log(matchingControl.value)
  
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            control.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
            control.setErrors(null);
        }
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  registerform()
 {
      this.submitted = true;
      // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
      var dataFormCome  = this.registerForm.value
      // dataFormCome.email,dataFormCome.password,dataFormCome.UserName
   
      var body  =
      {
        "name":dataFormCome.firstName+dataFormCome.lastName,
        "email":dataFormCome.email,
        "password":dataFormCome.password,
        "type":dataFormCome.typeUser,
        "gender":"male",
        "phone_1":dataFormCome.phone
      }
      this.auth.Register(body).subscribe(res=>
        {
          console.log(res)
          setTimeout(() => {
            this.toastr.successToastr("User Created")
            this.onReset();
            
          }, 500);
  
        },
        err=>
        {
          this.toastr.warningToastr(err.message)
        })
 } 
 onReset()
 {
  this.submitted = false;
  this.registerForm.reset();
 }

}

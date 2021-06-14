import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConceptsService } from 'src/app/AllService/concepts.service';
import { InstructorService } from 'src/app/AllService/instructor.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.scss']
})
export class InstructorProfileComponent implements OnInit {
instrucationInfo = []
url = ConceptsService.imageUrlProfile
img = "../../assets/no_user.jpg"
FristName
LastName
Phone
coursesChoosen = []
courses = []
coursesName = []
adress
bool = false
test

public profilePicture;
public profilePictureUrl;

dropdownSettings:IDropdownSettings;
  constructor(private sanitizer:DomSanitizer,public toastr: ToastrManager,private SerInstructor:InstructorService,private router:Router) 
  {
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
   }

  ngOnInit(): void {

    if(localStorage.getItem("type")== "instructor" || localStorage.getItem("login")== "true" || localStorage.getItem("actviation")== "1"  )
    {
      
      this.get_Instructor();
      

  

      
    }
  }
  get_Instructor()
  {
 
      this.SerInstructor.getInstractor().subscribe(res=>
        {
       
         if(res.success == false || res.success == "false")
         {
           this.toastr.warningToastr("Invalid TOKEN")
         }
         if(res.success == true || res.success == "true")
         {

         
           this.instrucationInfo.push(res.data)
           localStorage.setItem("NameUser",res.data.first_name)  
           for (let i = 0; i < res.data.courses.length; i++) {
           
            this.coursesChoosen = res.data.courses[i].course.id
           }

           console.log(this.coursesChoosen )
           
       
     
           
         }
         
        }
        ,(err:any)=>
        {
          console.log(err)
          this.toastr.warningToastr(err.error.message)
        }
        )
       }
       Updates_Instructor(body)
       {
       
          console.log(body)
           this.SerInstructor.updateInstructor(body).subscribe(res=>
             {
            
              if(res.success == false || res.success == "false")
              {
                this.toastr.warningToastr("Invalid TOKEN")
              }
              if(res.success == true || res.success == "true")
              {
     
                this.toastr.successToastr("Changed")
                setTimeout(() => {
                  window.location.reload()
                }, 1500);
                
              }
              
             }
             ,(err:any)=>
             {
               console.log(err)
               this.toastr.warningToastr(err.error.message)
             }
             )
            }
            changeProfile(event) { 
              if (event.target.files && event.target.files[0]) {
              var reader = new FileReader();
              let imfile=event.target.files[0]
              this.test =event.target.files[0]
              reader.readAsArrayBuffer(imfile); // read file as data url
              reader.onload = (event) => { // called once readAsDataURL is completed
               this.profilePicture = new Blob([reader.result], { type: imfile.type });
                // console.log(this.imgFile)
               let path = URL.createObjectURL(this.profilePicture);
               this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(path);
               if(this.profilePictureUrl!=null)
               {
                 this.bool=true
               }
                  }
            }
            }
            changePhoto()
            {
              let formData: FormData = new FormData();
              formData.append("photo",this.profilePicture);
              this.Updates_Instructor(formData)

            }
            showName()
            {
              this.FristName=this.instrucationInfo[0].first_name
              this.LastName=this.instrucationInfo[0].last_name

            }
            UbdateName()
            {
              var userName = {
                "first_name":this.FristName,
                "last_name":this.LastName,

              }
              if (this.FristName !="" ) {
                this.Updates_Instructor(userName)
                
              }
              if (this.FristName =="" ) {
                this.toastr.warningToastr("FristName Required")
                
              }
              

            }
            showPhone()
            {
              this.Phone=this.instrucationInfo[0].phone

            }
            UbdatePhone()
            {
             
              if (this.Phone !=this.instrucationInfo[0].phone ) {
                var phone = {
                  "phone":this.Phone,
                }
                this.Updates_Instructor(phone)
                
              }
              if (this.Phone ==this.instrucationInfo[0].phone ) {
                this.toastr.warningToastr("The phone has already been taken.")
                
              }
              

            }
            
            showAdress()
            {
              this.adress=this.instrucationInfo[0].address

            }
            UbdateAdress()
            {
              var adress = {
                "address":this.adress,
           
              }
             
                this.Updates_Instructor(adress)
                
              
       
              

            }
        
            UpdateCourse()
            {
              console.log(this.coursesChoosen)
              var x = []
              // x.push(this.coursesChoosen)
              var courses = {
                "courses":[this.coursesChoosen],

              }
           
                this.Updates_Instructor(courses)
                
           
              

            }
            get_Courses()
            {
           
                this.SerInstructor.courses().subscribe(res=>
                  {
                    console.log(res)
                    this.courses = res.data
                    
                  
                 
                  }
                  ,(err:any)=>
                  {
                    console.log(err)
                    this.toastr.warningToastr(err.error.message)
                  }
                  )
            }
       

}

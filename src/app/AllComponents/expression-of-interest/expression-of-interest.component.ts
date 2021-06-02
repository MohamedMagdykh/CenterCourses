import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EOIService } from 'src/app/AllService/e-o-i.service';

@Component({
  selector: 'app-expression-of-interest',
  templateUrl: './expression-of-interest.component.html',
  styleUrls: ['./expression-of-interest.component.scss']
})
export class ExpressionOfInterestComponent implements OnInit {
  days = [];
  selectedDays = [];
  dropdownSettings:IDropdownSettings;
  dropdownSettings2:IDropdownSettings;
  dropdownSettings3:IDropdownSettings;
  time = [];
  selectTime = [];
  Subject = [];
  numberChild = 1;
  yearData = []

  checkNumberChilds = false
  registerForm: FormGroup;
  submitted = false;
  
  
  
 
  constructor(private formBuilder: FormBuilder, private SerEOI:EOIService,public toastr: ToastrManager,private router:Router ) {
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings2= {
      singleSelection: false,
      idField: 'item_id2',
      textField: 'item_text2',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit:3,
      allowSearchFilter: true
    };
    this.dropdownSettings3= {
      singleSelection: false,
      idField: 'item_id3',
      textField: 'item_text3',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit:3,
      allowSearchFilter: true
    };


      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email,Validators.pattern('.*com$')]],
        phone:['', [Validators.required,Validators.pattern('[0-9]*')]],
        numberChild:['', Validators.required],
        comment:[''],
        numberChildren:this.formBuilder.array([]) 
      
        
    })

     
   }

   get numberChildren() : FormArray {
    
    return this.registerForm.get("numberChildren") as FormArray
  }

  newchild(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      PreferredDays: ['', Validators.required],
      Subject: ['', Validators.required],
      AcademicYear: ['', Validators.required],
      PreferredTime: ['', Validators.required],
    })
  }

 
  ngOnInit(): void {
    this.year()
   this.days = [
     "Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"
    ];
    this.time = [
      '8 AM' ,
      '9 AM' ,
      '10 AM' ,
 '11 AM' ,

    ];

    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
    
   

  }

  numformgroupValdiation()
  {
    var Childs: number = +(<HTMLInputElement>document.getElementById("numberChildren")).value;
    this.numberChild = Childs
    while (this.numberChildren.length !== 0) {
      this.numberChildren.removeAt(0)
    }
    for (let i = 0; i < Childs; i++) {
      this.numberChildren.push(this.newchild());
    }
    this.numformschildren()
  }
  numformschildren() { 
    this.checkNumberChilds = true
    return Array(this.numberChild); 
  } 

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
   
   
    var dataFormCome  = this.registerForm.value
  
  
     var dataFormGo =
    { 
      "firstName":dataFormCome.firstName ,
        "lastName":dataFormCome.lastName ,
        "email":dataFormCome.email ,
        "phone":dataFormCome.phone,
        "numberChild":dataFormCome.numberChild,
        "comment":dataFormCome.comment,
         
       

    }



    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(dataFormCome) )
    console.log(dataFormCome )
}
 courses(id:any)
 {
  

 var x = id.target.value
 console.log(x)
  // this.yearData.forEach(element => {
  //   if(element.id==id)
  //   {
  //     this.Subject = element.courses
  //   }
  // });
 }
year()
{

     this.SerEOI.year().subscribe(res=>
       {
        if(res.success == true || res.success == "true")
        {
          console.log(res.data)
          this.yearData=res.data
         
        }
        
       }
       ,(err:any)=>
       {
         console.log(err)
         this.toastr.warningToastr(err.error.message)
       }
       )
} 

}

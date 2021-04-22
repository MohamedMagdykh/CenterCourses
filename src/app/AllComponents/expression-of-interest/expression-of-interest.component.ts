import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

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
  time = [];
  selectTime = [];
  numberChild = 1

  checkNumberChilds = false
  registerForm: FormGroup;
  submitted = false;
  
  
  
 
  constructor(private formBuilder: FormBuilder) {
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
 


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  numberChild = "Number Of Children"

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
      email: ['', [Validators.required, Validators.email]],
      phone:
       {
        code: ['', Validators.required,Validators.maxLength(4), Validators.minLength(4)],
        number: ['', Validators.required, Validators.minLength(9)],

       }
     
  })
   }

  ngOnInit(): void {
   this.days = [
      { item_id2: 1, item_text2: 'Saturday' },
      { item_id2: 2, item_text2: 'Sunday' },
      { item_id2: 3, item_text2: 'Monday' },
      { item_id2: 4, item_text2: 'Tuesday ' },
      { item_id2: 5, item_text2: 'Wednesday' },
      { item_id2: 6, item_text2: 'Thursday' },
      { item_id2: 7, item_text2: 'Friday' }

    ];
    this.time = [
      { item_id: 1, item_text: '8 AM' },
      { item_id: 2, item_text: '9 AM' },
      { item_id: 3, item_text: '10 AM' },
      { item_id: 4, item_text: '11 AM' },
      { item_id: 5, item_text: '12 AM' },
      { item_id: 6, item_text: '1 BM' },
      { item_id: 7, item_text: '2 BM' },
      { item_id: 8, item_text: '3 BM' },
      { item_id: 9, item_text: '4 BM' },
      { item_id: 10, item_text: '5 BM' },
      { item_id: 11, item_text: '6 BM' },
      { item_id: 12, item_text: '7 BM' },
      { item_id: 13, item_text: '8 BM' }

    ];
    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
    
   

  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  numSequence() { 
   
    var Childs: number = +this.numberChild;
    this.checkNumberChilds = true
    return Array(Childs); 

  } 
  infoChilds()
  {
    var Childs: number = +this.numberChild
    
 
    var infochilds = []
    for (let i = 0; i < Childs; i++) {
      infochilds.push({
        "name":document.getElementById("namechild"+i)

      })
      

      
      
    }
    console.log(infochilds)
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}
 


}

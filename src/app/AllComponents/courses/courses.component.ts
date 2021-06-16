import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgwWowService } from 'ngx-wow';
import { ConceptsService } from 'src/app/AllService/concepts.service';
import { CoursesService } from 'src/app/AllService/courses.service';
import { InstructorService } from 'src/app/AllService/instructor.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  url = ConceptsService.imageUrlProfile
  subjects = [
    // {
    //   id:"1",
    //   name:"math",
    //   photo:"../../../assets/math.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:25,
    //   visable:true
      
    // },
    // {
    //   id:"2",
    //   name:"biology",
    //   photo:"../../../assets/biology.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:30,
    //   visable:true
      
    // },
    // {
    //   id:"3",
    //   name:"chemistry",
    //   photo:"../../../assets/chemistry.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:20,
    //   visable:true
      
    // },
    // {
    //   id:"4",
    //   name:"art",
    //   photo:"../../../assets/art.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:16,
    //   visable:true
      
    // },
    // {
    //   id:"5",
    //   name:"english",
    //   photo:"../../../assets/english2.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:33,
    //   visable:true
      
    // },
    // {
    //   id:"6",
    //   name:"geography",
    //   photo:"../../../assets/geography.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:23,
    //   visable:true
      
    // },
    // {
    //   id:"7",
    //   name:"history",
    //   photo:"../../../assets/history.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:28,
    //   visable:true
      
    // },
    // {
    //   id:"8",
    //   name:"physics",
    //   photo:"../../../assets/physics.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:29,
    //   visable:true
      
    // },
    // {
    //   id:"9",
    //   name:"Computer",
    //   photo:"../../../assets/Computer.jpg",
    //   describe:"Some text to describe the course etc...",
    //   price:44,
    //   visable:true
      
    // }
  ]
  subjectSelect=[]
  totalPrice = 0 
  totalPriceShow = 0 
  @ViewChild('closebutton') closebutton;
  offers = []
  btnEnrollVisable = false

  constructor(private wowService: NgwWowService,private router:Router,private formBuilder: FormBuilder, private SerInstructor:InstructorService, private SerOffers:CoursesService,public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.wowService.init();
    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
    this.get_Courses()
    this.get_Offers()
    if(localStorage.getItem("type")== "parent" && localStorage.getItem("login")== "true" && localStorage.getItem("actviation")== "1")
    {
      
      this.btnEnrollVisable = true
      this.get_MyStudent()
    }
    
  }
  addCard(id)
  {
    for (let i = 0; i < this.subjects.length; i++) {
    
      if(id == this.subjects[i].id )
      {
        if(this.subjects[i].visable == true)
        {
          this.subjects[i].visable = false
          this.subjectSelect.push(this.subjects[i])

        }
        else
        {
          this.subjects[i].visable = true
          for (let j = 0; j < this.subjectSelect.length; j++)
           {
             if(id == this.subjectSelect[j].id)
             {
              this.subjectSelect.splice(j, 1);

             }
            
            
           }

        }
   
        
      }
    
    
      
    }
    this.totalPrice = 0
    this.totalPriceShow = 0
    for (let k = 0; k < this.subjectSelect.length; k++) {
      this.totalPrice = this.totalPrice + this.subjectSelect[k].price
      if(this.subjectSelect.length == 1)
        {
          this.totalPriceShow = this.totalPrice
          
        }
      if(this.subjectSelect.length == 2)
        {
          this.totalPriceShow = this.totalPrice - (this.totalPrice * 5 / 100)

        }
        if(this.subjectSelect.length >= 3)
        {
          this.totalPriceShow  = this.totalPrice  - (this.totalPrice  * 10 / 100)

        }

      
    
      
    }
    if(this.subjectSelect.length==0)
    {
      this.closebutton.nativeElement.click();
      
    }
 
 

    console.log(this.subjectSelect);
    
  }
  get_Courses()
            {
           
                this.SerOffers.get_Packages().subscribe(res=>
                  {
                    console.log(res)
                    this.subjects = res.data

                    
                  
                 
                  }
                  ,(err:any)=>
                  {
                    console.log(err)
                    this.toastr.warningToastr(err.error.message)
                  }
                  )
            }
            get_Offers()
            {
           
                this.SerOffers.get_Offers().subscribe(res=>
                  {
                    console.log(res.data)
                    this.offers = res.data

                    
                  
                 
                  }
                  ,(err:any)=>
                  {
                    console.log(err)
                    this.toastr.warningToastr(err.error.message)
                  }
                  )
            }
            get_MyStudent()
            {
           
                this.SerOffers.getMyStudent().subscribe(res=>
                  {
                    console.log(res.data)
                    
                  }
                  ,(err:any)=>
                  {
                    console.log(err)
                    this.toastr.warningToastr(err.error.message)
                  }
                  )
            }

}

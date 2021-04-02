import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  subjects = [
    {
      id:"1",
      name:"math",
      photo:"../../../assets/math.jpg",
      describe:"Some text to describe the course etc...",
      price:25,
      visable:true
      
    },
    {
      id:"2",
      name:"biology",
      photo:"../../../assets/biology.jpg",
      describe:"Some text to describe the course etc...",
      price:30,
      visable:true
      
    },
    {
      id:"3",
      name:"chemistry",
      photo:"../../../assets/chemistry.jpg",
      describe:"Some text to describe the course etc...",
      price:20,
      visable:true
      
    },
    {
      id:"4",
      name:"art",
      photo:"../../../assets/art.jpg",
      describe:"Some text to describe the course etc...",
      price:16,
      visable:true
      
    },
    {
      id:"5",
      name:"english",
      photo:"../../../assets/english2.jpg",
      describe:"Some text to describe the course etc...",
      price:33,
      visable:true
      
    },
    {
      id:"6",
      name:"geography",
      photo:"../../../assets/geography.jpg",
      describe:"Some text to describe the course etc...",
      price:23,
      visable:true
      
    },
    {
      id:"7",
      name:"history",
      photo:"../../../assets/history.jpg",
      describe:"Some text to describe the course etc...",
      price:28,
      visable:true
      
    },
    {
      id:"8",
      name:"physics",
      photo:"../../../assets/physics.jpg",
      describe:"Some text to describe the course etc...",
      price:29,
      visable:true
      
    },
    {
      id:"9",
      name:"Computer",
      photo:"../../../assets/Computer.jpg",
      describe:"Some text to describe the course etc...",
      price:44,
      visable:true
      
    }
  ]
  subjectSelect=[]
  totalPrice = 0 
  totalPriceShow = 0 
  @ViewChild('closebutton') closebutton;

  constructor(private wowService: NgwWowService,private router:Router) { }

  ngOnInit(): void {
    this.wowService.init();
    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
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
 
 

    // console.log(this.subjectSelect);
    

  }

}

import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions 

  constructor(private wowService: NgwWowService) { }

  ngOnInit(): void
   {
     if(localStorage.getItem("actviation")== "0")
     {
       setTimeout(() => {
        document.getElementById("ActivationAcountbtn").click();

       }, 500);

     }
    this.wowService.init();
    this.customOptions= {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      autoplay:true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      nav: false
    }
    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
  }


}

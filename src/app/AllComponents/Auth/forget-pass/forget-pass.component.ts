import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    document.getElementById('footer').style.width= "100%"
    document.getElementById('footer').style.marginLeft= "0%"
    if( localStorage.getItem("login")== "true"  )
    {
      this.router.navigate([''])
    }
  }

}

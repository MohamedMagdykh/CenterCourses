import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-side-bar',
  templateUrl: './instructor-side-bar.component.html',
  styleUrls: ['./instructor-side-bar.component.scss']
})
export class InstructorSideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('footer').style.width= "83.333333%"
    document.getElementById('footer').style.marginLeft= "16.666667%"
  }

}

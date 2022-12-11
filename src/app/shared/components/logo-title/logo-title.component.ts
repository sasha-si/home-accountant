import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-title',
  templateUrl: './logo-title.component.html',
  styleUrls: ['./logo-title.component.scss']
})
export class LogoTitleComponent implements OnInit {

  title = 'home accountant'; //needs to be made as shared

  constructor() { }

  ngOnInit(): void {
  }

}

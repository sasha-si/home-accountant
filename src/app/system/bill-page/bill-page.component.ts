import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { BillService } from './../shared/services/bill.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    // forkJoin([
    //   this.billService.getBill(),
    //   this.billService.getCurrency()
    // ]).subscribe({next: value => console.log(value)});

    combineLatest([
        this.billService.getBill(),
        this.billService.getCurrency()
      ]).subscribe({next: value => console.log(value)});
  }

}

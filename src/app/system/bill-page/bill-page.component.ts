import { Component, OnInit } from '@angular/core';
import { combineLatest, delay } from 'rxjs';

import { Bill } from './../shared/interfaces/bill';
import { BillService } from './../shared/services/bill.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  bill!: Bill;
  currency: any;
  isLoaded: boolean = false;

  constructor(private billService: BillService) { }

  getData() {
    combineLatest([
      this.billService.getBill(),
      this.billService.getCurrency('usd'),
      this.billService.getCurrency('eur')
    ])
    .pipe(delay(200))//delay!!!!!!!!!!!!!!!!!!!!!!!!!!
    .subscribe({
      next: value => {        
        this.bill = (value[0]),        
        this.currency = {"usd": value[1][0]},
        this.currency = {...this.currency, "eur": value[2][0]},
        this.isLoaded = true
      }
    });
  };

  ngOnInit(): void {
    this.getData();    
  }

  onRefresh() {
    this.isLoaded = false;

    this.getData();
  };
}

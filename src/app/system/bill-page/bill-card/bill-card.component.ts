import { Bill } from './../../shared/interfaces/bill';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill!: Bill;
  @Input() currency!: any;
  dollar!: number;
  euro!: number;

  constructor() { }

  ngOnInit(): void {    
    this.dollar = this.bill.value / this.currency.usd.rate;
    this.euro = this.bill.value / this.currency.eur.rate;
  }
}

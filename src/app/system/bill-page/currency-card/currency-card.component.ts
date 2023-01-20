import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency!: any;
  dollar: any;
  euro: any;

  constructor() { }

  ngOnInit(): void {    
    this.dollar = this.currency.usd;
    this.euro = this.currency.eur;
  }
}

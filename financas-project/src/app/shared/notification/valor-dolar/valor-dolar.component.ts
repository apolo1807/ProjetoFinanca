import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { ValorDolarService } from './valor-dolar.service';

@Component({
  selector: 'app-valor-dolar',
  templateUrl: './valor-dolar.component.html',
  styleUrls: ['./valor-dolar.component.css']
})
export class ValorDolarComponent implements OnInit {

  dolar: number;

  constructor(private service: ValorDolarService) { }

  ngOnInit() {

    this.service.findDollarValue().subscribe(dolarValue => {
      this.dolar = dolarValue.USDBRL.ask;
    })

    this.checkDolar();
  }

  checkDolar() {

    interval(60000).subscribe(() => {

      this.service.findDollarValue().subscribe(dolarValue => {

        if(this.dolar != dolarValue.USDBRL.ask) {
          this.dolar = dolarValue.USDBRL.ask;
        }

      })

    })

  }

}

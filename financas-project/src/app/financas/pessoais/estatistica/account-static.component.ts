import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from '../financasPessoaisDomain';
import { RendaService } from '../renda/renda.service';

@Component({
  selector: 'account-static',
  templateUrl: 'account-statics.component.html'
})

export class AccountStaticsComponent implements OnInit {

  constructor(private service: AppService) { }

  rendaFixa: number;

  ngOnInit() {
    this.getRendaFixa();
  }

  getRendaFixa() {
    this.service.getFinancas().subscribe(valor => this.rendaFixa = valor[0].totalRenda);
  }

}

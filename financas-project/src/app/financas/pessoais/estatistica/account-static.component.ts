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
  suficiente: boolean;

  ngOnInit() {
    this.getRendaFixa();
    this.estadoRenda();
  }

  getRendaFixa() {
    this.service.getFinancas().subscribe(valor => this.rendaFixa = valor[0].totalRenda);
  }

  estadoRenda() {

    this.service.getFinancas().subscribe(financas => {

        let debito = 0;

        financas.forEach(valor => {

          if(valor.tipoEstadoGasto == "PENDENTE") {

            if(valor.isParcelado) {
              debito += valor.parcelas;
            }

            if(!valor.isParcelado) {
              debito += valor.valor;
            }
          }

        })

        if(financas[0].totalRenda > debito) {
          this.suficiente = true;
        } else {
          this.suficiente = false;
        }
    });
  }

}

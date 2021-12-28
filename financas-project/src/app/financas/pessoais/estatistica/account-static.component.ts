import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from '../financasPessoaisDomain';
import { RendaListComponent } from '../renda/renda-list/renda-list.component';
import { RendaService } from '../renda/renda.service';

@Component({
  selector: 'account-static',
  templateUrl: 'account-statics.component.html'
})

export class AccountStaticsComponent implements OnInit {

  constructor(
    private service: AppService,
    private rendaService: RendaService
  ) { }

  rendaFixa: number;
  suficiente: boolean;
  resto: number;
  totalRenda: number;

  ngOnInit() {
    this.calcularTotalRenda();
    this.estadoRenda();
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

        if(this.totalRenda > debito) {
          this.suficiente = true;
        } else {
          this.suficiente = false;
        }
    });
  }

  calcularTotalRenda() {
    this.rendaService.getRendas().subscribe(rendas => {

      let valorRenda = 0;

      rendas.forEach(response => {
        valorRenda += response.valor;
      })

      this.totalRenda = valorRenda;
    })
  }
}

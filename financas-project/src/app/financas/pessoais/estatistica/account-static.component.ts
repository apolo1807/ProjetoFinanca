import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/financas/pessoais/financas/shared/financas-pessoais.service';
import { CalculoService } from 'src/app/shared/calculo/calculo.service';
import { GastosService } from '../gastos/shared/gastos.service';
import { RendaService } from '../renda/renda.service';

@Component({
  selector: 'account-static',
  templateUrl: 'account-statics.component.html'
})

export class AccountStaticsComponent implements OnInit {

  constructor(private calculoService: CalculoService) { }

  suficiente: boolean;
  resto: number;
  totalRenda: number;
  totalGasto: number;
  rendaFixa: number;

  ngOnInit() {
    this.gerarEstatistica();
  }

  gerarEstatistica() {
    this.calculoService.getCalculoValores().subscribe(calculos => {

      if(calculos.renda > calculos.gasto + calculos.totalMensal) {
        this.suficiente = true;
      } else {
        this.suficiente = false;
      }

      this.totalRenda = calculos.renda;
      this.totalGasto = calculos.gasto;
    });
  }


}

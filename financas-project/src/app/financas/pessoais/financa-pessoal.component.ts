import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from './financasPessoaisDomain';

@Component({
  selector: 'financa-pessoal',
  templateUrl: 'financa-pessoal.component.html'
})

export class FinancaPessoalComponent implements OnInit {

  financaInicialize: FinancasPessoais;
  financaDelete: FinancasPessoais;
  success: boolean;
  financas: FinancasPessoais[] = [];
  total: number;
  totalMensal: number;
  totalPago: number;
  resto: number;

  constructor(private service: AppService) {this.financaInicialize = new FinancasPessoais()}

  ngOnInit() {
    this.getAllFinancas();
  }

  getAllFinancas() {
    this.service.getFinancas().subscribe(response => {

      let debitoPendente = 0;
      let debitoPago = 0;

      response.forEach(values => {

        if(values.tipoEstadoGasto == "PAGO") {

          if(values.isParcelado) {
            debitoPago += values.parcelas;
          }

          if(!values.isParcelado) {
            debitoPago += values.valor;
          }
        }

        if(values.tipoEstadoGasto == "PENDENTE") {

          if(values.isParcelado) {
            debitoPendente += values.parcelas;
          }

          if(!values.isParcelado) {
            debitoPendente += values.valor;
          }

        }

      });

      this.totalMensal = debitoPendente;
      this.totalPago = debitoPago;
      this.total = response[0].total;
      this.financas = response;
      this.resto = response[0].totalRenda - this.totalMensal;
    })
  }

  declararPago(financa: FinancasPessoais) {
    financa.tipoEstadoGasto = "PAGO";
    this.service.salvar(financa).subscribe(() => {
      this.getAllFinancas();
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2500)
    });
  }

  openModal(financaModal: FinancasPessoais){
    this.financaDelete = financaModal;
  }

  deletarFinanca(financaDelete: any) {
    this.service.deleteFinanca(financaDelete).subscribe(() => {
      this.getAllFinancas();
    });
  }

}

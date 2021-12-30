import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from './financasPessoaisDomain';

@Component({
  selector: 'financa-pessoal',
  templateUrl: 'financa-pessoal.component.html'
})

export class FinancaPessoalComponent implements OnInit {

  financaInicialize: FinancasPessoais;
  financaModal: FinancasPessoais;
  modal: FinancasPessoais;
  success: boolean;
  financas: FinancasPessoais[] = [];
  total: number;
  totalMensal: number;
  totalPago: number;
  numeroParcelas: any = [];
  parcelasAntecipadas: number;
  resto: number;
  suficiente: boolean;
  print: any;

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

      if(this.resto > response[0].totalRenda) {
        this.suficiente = true;
      }
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

  calcularNumeroParcelas(financa: FinancasPessoais) {

    let parcelasArray = [];

    for(let i = 0; i < financa.valorParcelas; i++) {
      parcelasArray.push(i);
    }

    this.numeroParcelas = parcelasArray;
  }

  adiantarParcelas(financa: FinancasPessoais) {
    financa.valorParcelas -=  this.parcelasAntecipadas;
    this.service.salvar(financa).subscribe(() => {
      this.getAllFinancas();
    })
  }

  openModal(financaModal: FinancasPessoais){
    this.modal = financaModal;
  }

  openModalAdiantar(financaModal: FinancasPessoais) {
    this.financaModal = financaModal;
    this.calcularNumeroParcelas(financaModal);
  }

  deletarFinanca(financaDelete: any) {
    this.service.deleteFinanca(financaDelete).subscribe(() => {
      this.getAllFinancas();
    });
  }

  onPrintView(idPrint: any) {
    let content = document.getElementById(idPrint)?.innerHTML;
    let open = window.open();
    open?.document.write(content? content : '');
    open?.print();
    open?.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { AppService } from 'src/app/financas/pessoais/financas/shared/financas-pessoais.service';
import { CalculoService } from 'src/app/shared/calculo/calculo.service';
import { FinancasPessoais, Page } from '../shared/financasPessoaisDomain';

@Component({
  selector: 'financa-pessoal',
  templateUrl: 'financa-pessoal.component.html',
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
  print: any;
  adiantado: boolean;
  totalRenda: number;
  current: number = 0;
  page: Page = {} as Page;

  constructor(
    private service: AppService,
    private calculoService: CalculoService
  ) {
    this.financaInicialize = new FinancasPessoais();
  }

  ngOnInit() {
    this.getAllFinancas(this.current);
  }

  getAllFinancas(current: number) {
    this.service.getFinancasPageable(current, 5).subscribe((response) => {
      this.calculoService.getCalculoValores().subscribe((calculos) => {
        this.total = calculos?.total;
        this.totalMensal = calculos?.totalMensal;
        this.totalPago = calculos?.totalPago;
        this.totalRenda = calculos?.totalRenda;
        this.resto = calculos?.resto;
      });
      this.page = response;
      this.financas = response.content;
    });
  }

  declararPago(financa: FinancasPessoais) {
    this.service.declararPago(financa).subscribe(() => {
      this.getAllFinancas(this.current);
    });
  }

  adiantarParcelas(financa: FinancasPessoais) {
    financa.valores.valorParcelas -= this.parcelasAntecipadas;
    this.service.salvar(financa).subscribe(() => {
      this.getAllFinancas(this.current);
      this.adiantado = true;
      setTimeout(() => {
        this.adiantado = false;
      }, 2500);
    });
  }

  openModal(financaModal: FinancasPessoais) {
    this.modal = financaModal;
  }

  openModalAdiantar(financaModal: FinancasPessoais) {
    this.financaModal = financaModal;
    this.calcularNumeroParcelas(financaModal);
  }

  deletarFinanca(financaDelete: any) {
    this.service.deleteFinanca(financaDelete).subscribe(() => {
      if(this.page.content.length == 1) {
        this.current = 0;
      }
      this.getAllFinancas(this.current);
    });
  }

  changePage(event: any) {
    this.page.number = event;
    this.current = this.page.number;
    this.getAllFinancas(this.page.number - 1);
  }

  onPrintView(idPrint: any) {
    let content = document.getElementById(idPrint)?.innerHTML;
    let open = window.open();
    open?.document.write(content ? content : '');
    open?.print();
    open?.close();
  }

  private calcularNumeroParcelas(financa: FinancasPessoais) {
    let parcelasArray = [];
    for (let i = 0; i < financa.valores.valorParcelas; i++) {
      parcelasArray.push(i);
    }

    this.numeroParcelas = parcelasArray;
  }
}

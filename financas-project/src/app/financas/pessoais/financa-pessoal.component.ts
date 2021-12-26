import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from './financasPessoaisDomain';

@Component({
  selector: 'financa-pessoal',
  templateUrl: 'financa-pessoal.component.html'
})

export class FinancaPessoalComponent implements OnInit {

  financaInicialize: FinancasPessoais;
  financaDelete: FinancasPessoais;
  financas: FinancasPessoais[] = [];
  total: number;
  totalMensal: number;

  constructor(private service: AppService) {this.financaInicialize = new FinancasPessoais()}

  ngOnInit() {
    this.getAllFinancas();
  }

  getAllFinancas() {
    this.service.getFinancas().subscribe(response => {

      let debito = 0;

      response.forEach(values => {

        console.log(values);


        if(values.isParcelado) {
          debito += values.parcelas;
        }

        if(!values.isParcelado) {
          debito += values.total;
        }

      });

      this.totalMensal = debito;
      this.total = response[0].total;
      this.financas = response;
    })
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

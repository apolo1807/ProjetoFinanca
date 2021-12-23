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

  constructor(private service: AppService) {this.financaInicialize = new FinancasPessoais()}

  ngOnInit() {
    this.getAllFinancas();
  }

  getAllFinancas() {
    this.service.getFinancas().subscribe(response => {
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

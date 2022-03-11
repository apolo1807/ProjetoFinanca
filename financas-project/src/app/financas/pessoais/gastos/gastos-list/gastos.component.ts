import { Component, OnInit } from '@angular/core';
import { CalculoService } from 'src/app/shared/calculo/calculo.service';
import { GastosModel, Page } from '../shared/gastos-model';
import { GastosService } from '../shared/gastos.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html'
})
export class GastosComponent implements OnInit {

  gastos: GastosModel[];
  page: Page = {} as Page;
  gastoModal: GastosModel;
  totalGasto: number;
  totalMensal: number;
  current: number;
  deletado: boolean = false;

  constructor(
    private service: GastosService,
    private calculoService: CalculoService) { }

  ngOnInit() {
    this.getAllGastos(this.current);
  }

  getAllGastos(current: number) {
    this.service.getGastosPageable(current, 5).subscribe(response => {
      this.gastos = response.content;
      this.page = response;
      console.log(response);

      this.calculoService.getCalculoValores().subscribe(calculo => {
        this.totalMensal = calculo.totalMensal;
        this.totalGasto = calculo.totalGasto;
      })
    });
  }

  changePage(event: any) {
    this.page.number = event;
    this.current = this.page.number;
    this.getAllGastos(this.page.number - 1);
  }

  openModal(gasto: GastosModel) {
    this.gastoModal = gasto;
  }

  deletarGasto(gasto: GastosModel) {
    this.service.delete(gasto).subscribe(() => {
      if(this.page.content.length == 1) {
        this.current = 0;
      }
      this.deletado = false;
      setTimeout(() => {
        this.deletado = false;
      }, 2000);
      this.getAllGastos(this.current);
    });
  }
}

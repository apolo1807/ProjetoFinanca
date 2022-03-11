import { Component, OnInit } from '@angular/core';
import { CalculoService } from 'src/app/shared/calculo/calculo.service';
import { Page, Renda } from '../renda-model';
import { RendaService } from '../renda.service';

@Component({
  selector: 'app-renda-list',
  templateUrl: './renda-list.component.html',
  styleUrls: ['./renda-list.component.css']
})
export class RendaListComponent implements OnInit {

  rendas: Renda[] = [];
  rendasInitialize: Renda;
  rendaDelete: Renda;
  totalRenda: number;
  current: number;
  page: Page = {} as Page;

  constructor(
    private service: RendaService,
    private calculoService: CalculoService) { this.rendasInitialize = new Renda() }

  ngOnInit() {
    this.getAllRenda(this.current);
    this.calcularTotalRenda();
  }

  getAllRenda(current: number) {
    this.service.getRendasPageable(current, 5).subscribe(response => {
      this.page = response;
      this.rendas = response.content;
    })
  }

  changePage(event: any) {
    this.page.number = event;
    this.current = this.page.number;
    this.getAllRenda(this.page.number - 1);
  }

  openModal(rendaModal: Renda){
    this.rendaDelete = rendaModal;
  }

  deletarRenda(renda: any) {
    this.service.delete(renda).subscribe(() => {
      if(this.page.content.length == 1) {
        this.current = 0;
      }
      this.getAllRenda(this.current);
    })
  }

  calcularTotalRenda() {
    this.calculoService.getCalculoValores().subscribe(calculos => {
      this.totalRenda = calculos.renda;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Renda } from '../renda-model';
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

  constructor(private service: RendaService) { this.rendasInitialize = new Renda() }

  ngOnInit() {
    this.getAllRenda();
    this.calcularTotalRenda();
  }

  getAllRenda() {
    this.service.getRendas().subscribe(response => {
      this.rendas = response;
    })
  }

  openModal(rendaModal: Renda){
    this.rendaDelete = rendaModal;
  }

  deletarRenda(renda: any) {
    this.service.delete(renda).subscribe(() => {
      this.getAllRenda();
    })
  }

  calcularTotalRenda() {
    this.service.getRendas().subscribe(rendas => {

      let valorRenda = 0;

      rendas.forEach(response => {
        valorRenda += response.valor;
      })

      this.totalRenda = valorRenda;
    })
  }
}

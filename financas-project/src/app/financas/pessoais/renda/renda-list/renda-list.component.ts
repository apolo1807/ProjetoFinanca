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

  constructor(private service: RendaService) { this.rendasInitialize = new Renda() }

  ngOnInit() {
    this.getAllRenda();
  }

  getAllRenda() {
    this.service.getRendas().subscribe(response => {
      this.rendas = response;
    })
  }


}

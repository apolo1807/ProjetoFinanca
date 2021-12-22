import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-financa',
  templateUrl: 'navbar.component.html'
})

export class NavbarFinancaComponent implements OnInit {

  ativadoDolar: boolean = false;

  constructor() { }

  ngOnInit() { }

  ativar() {
    this.ativadoDolar = !this.ativadoDolar;
  }


}

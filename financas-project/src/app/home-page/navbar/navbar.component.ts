import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

  ativadoDolar: boolean = false;

  constructor() { }

  ngOnInit() { }

  ativar() {
    this.ativadoDolar = !this.ativadoDolar;
  }
}

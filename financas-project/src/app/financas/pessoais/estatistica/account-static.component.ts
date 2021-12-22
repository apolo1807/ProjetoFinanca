import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from '../financasPessoaisDomain';

@Component({
  selector: 'account-static',
  templateUrl: 'account-statics.component.html'
})

export class AccountStaticsComponent implements OnInit {

  form: FormGroup;
  financas: FinancasPessoais[] = [];

  constructor(
    private service: AppService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getValor();
    this.form = this.createForm();
  }

  createForm(): FormGroup {

    const form = this._formBuilder.group({
      "totalRenda": ['']
    })

    return form;
  }

  getValor() {
    this.service.getFinancas().subscribe(response => {
      console.log(response);

    })
  }


}

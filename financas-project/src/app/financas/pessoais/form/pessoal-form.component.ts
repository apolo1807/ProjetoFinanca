import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from '../financasPessoaisDomain';

@Component({
  selector: 'pessoal-form',
  templateUrl: 'pessoal-form.component.html',
  styleUrls: ['pessoal-form.component.css']
})

export class PessoalFormComponent implements OnInit {

  id: number;
  isEdit: boolean = false;
  successResponse: boolean = false;
  pessoalFinanca: FinancasPessoais;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private _activated: ActivatedRoute)
    {
      this.pessoalFinanca = new FinancasPessoais();
    }

  ngOnInit() {
    this.form = this.createForm();

    const params: Observable<Params> = this._activated.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service.findById(this.id).subscribe(response => {
          this.isEdit = true;
          this.form.setValue(response);
        })
      }});
  }

  createForm():FormGroup {

    const form = this.formBuilder.group({
      id: [''],
      gasto: ['', Validators.required],
      descricao: [''],
      parcelas: [''],
      valorParcelas: [''],
      isParcelado: [false],
      valor: ['', Validators.required],
      dataInicio: [''],
      dataFim: [''],
      total: ['1000'],
    });

    if(form.get('isParcelado')?.value) {
      form.get('valorParcelas')?.setValidators([Validators.required]);
    }

    return form;
  }

  onSubmit() {
    this.service.salvar(this.form.value).subscribe(response => {
      this.form.reset();
      this.successResponse = true;
    });
  }

}

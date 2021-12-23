import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { concat, Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DataCurrentyYear } from 'src/app/shared/Validators/dataCurrentyYear.validator';
import { FinancasPessoais } from '../financasPessoaisDomain';

@Component({
  selector: 'pessoal-form',
  templateUrl: 'pessoal-form.component.html',
  styleUrls: ['pessoal-form.component.css']
})

export class PessoalFormComponent implements OnInit {

  id: number;
  year:any = moment().year();
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
      totalRenda: [''],
      dataInicio: [''],
      dataFim: [''],
      total: ['1000'],
    });

    const dataInicio = form.get('dataInicio');

    if(form.get('isParcelado')?.value) {
      form.get('valorParcelas')?.setValidators([Validators.required]);
    }

    dataInicio?.valueChanges.subscribe(r => {
      dataInicio.setValidators([DataCurrentyYear]);
    })

    return form;
  }

  onSubmit() {
    this.service.salvar(this.form.value).subscribe(response => {

      if(!this.isEdit) {
        this.form.reset();
      }

      this.successResponse = true;
      setTimeout(() => {
        this.successResponse = false;
      }, 2500)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/financas/pessoais/financas/shared/financas-pessoais.service';
import { DataCurrentyYear } from 'src/app/shared/Validators/dataCurrentyYear.validator';
import { FinancasPessoais } from '../shared/financasPessoaisDomain';

@Component({
  selector: 'pessoal-form',
  templateUrl: 'pessoal-form.component.html',
  styleUrls: ['pessoal-form.component.css'],
})
export class PessoalFormComponent implements OnInit {
  id: number;
  isEdit: boolean = false;
  successResponse: boolean = false;
  pessoalFinanca: FinancasPessoais;
  form: FormGroup;
  valores: FormGroup;
  year = moment().year();

  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private _activated: ActivatedRoute
  ) {
    this.pessoalFinanca = new FinancasPessoais();
  }

  ngOnInit() {
    this.form = this.createForm();
    this.valores = this.createValores();

    const params: Observable<Params> = this._activated.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.findById(this.id).subscribe((response) => {
          this.isEdit = true;
          this.form.setValue(response);
        });
      }
    });
  }

  onSubmit() {
    if (!this.isEdit) {
      this.form.get('valores')?.setValue(this.valores.value);
    }

    this.service.salvar(this.form.value).subscribe(() => {
      if (!this.isEdit) {
        this.form.reset();
        this.valores.reset();
      }
      this.successResponse = true;
      setTimeout(() => {
        this.successResponse = false;
      }, 2500);
    });
  }

  private createForm(): FormGroup {
    const form = this.formBuilder.group({
      id: [''],
      gasto: ['', Validators.required],
      descricao: [''],
      valores: [''],
      dataInicio: [''],
      dataFim: [''],
    });

    const dataInicio = form.get('dataInicio');

    if (form.get('isParcelado')?.value) {
      form.get('valorParcelas')?.setValidators([Validators.required]);
    }

    dataInicio?.valueChanges.subscribe(() => {
      dataInicio.setValidators([DataCurrentyYear]);
    });

    return form;
  }

  private createValores() {

    const form = this.formBuilder.group({
      parcelas: [''],
      isParcelado: [false],
      valorParcelas: [''],
      valor: [''],
    });

    if (form.get('isParcelado')?.value) {
      form.get('valorParcelas')?.setValidators([Validators.required]);
    }

    return form;
  }
}

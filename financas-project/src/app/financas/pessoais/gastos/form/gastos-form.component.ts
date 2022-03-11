import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Valores } from 'src/app/shared/model/valores.model';

import { GastosService } from '../shared/gastos.service';

@Component({
  selector: 'app-gastos-form',
  templateUrl: './gastos-form.component.html',
})
export class GastosFormComponent implements OnInit {

  form: FormGroup;
  valores: FormGroup;
  id: number;

  constructor(
    private _formBuilder: FormBuilder,
    private service: GastosService,
    private _activated: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.createForm();
    this.valores = this.createValores();

    const params: Observable<any> = this._activated.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service.findById(this.id).subscribe(response => {
          this.form.setValue(response);
        });
      }
    });
  }

  salvar() {
    this.form.get('valores')?.setValue(this.valores.value);
    this.service.salvar(this.form.value).subscribe(() => {
      this.form.reset();
      this.valores.reset();
    });
  }


  private createForm(): FormGroup {

    const form = this._formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      tipoGasto: ['', Validators.required],
      valores: [''],
      fidelidade: [''],
      dataInicio: [''],
      dataFim: [''],
      tempoFidelidade: [''],
    });

    if(form.get('parcela')?.value) {
      form.get('valorParcelas')?.setValidators([Validators.required]);
    }

    return form;
  }

  private createValores() {

    const form = this._formBuilder.group({
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

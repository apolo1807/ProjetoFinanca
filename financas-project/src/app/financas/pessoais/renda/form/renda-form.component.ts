import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { RendaService } from '../renda.service';

@Component({
  selector: 'app-renda-fixa',
  templateUrl: './renda-form.component.html',
  styleUrls: ['renda-form.component.css']
})
export class RendaFormComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean = false;
  successResponse: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: RendaService,
    private _activated: ActivatedRoute
  ) { }

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
      }
    })
  }

  createForm():FormGroup {

    const form = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      tipoRenda: ['', Validators.required],
      ativa: [''],
      passiva: [''],
      valor: ['', Validators.required]
    })

    form.get('tipoRenda')?.valueChanges.subscribe(r => {

        if(form.get('tipoRenda')?.value == 0) {
          form.get('ativa')?.setValidators([Validators.required]);
        } else {
          form.get('passiva')?.setValidators([Validators.required]);
        }

    })

    return form;
  }

  onSubmit() {
    this.service.salvarRenda(this.form.value).subscribe(response => {

      if(!this.isEdit) {
        this.form.reset();
      }

      this.successResponse = true;
      setTimeout(() => {
        this.successResponse = false;
      }, 2500);
    });
  }

}

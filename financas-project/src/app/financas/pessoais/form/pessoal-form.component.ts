import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FinancasPessoais } from '../financasPessoaisDomain';

@Component({
  selector: 'pessoal-form',
  templateUrl: 'pessoal-form.component.html',
  styleUrls: ['pessoal-form.component.css']
})

export class PessoalFormComponent implements OnInit {

  pessoalFinanca: FinancasPessoais;
  form: FormGroup;
  id: number;
  hasSaved: false;

  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private _activated: ActivatedRoute,
    private router: Router)
    {
      this.pessoalFinanca = new FinancasPessoais();
    }

  ngOnInit() {
    this.form = this.createForm();
    this.editarFinanca();
  }

  createForm():FormGroup {

    const form = this.formBuilder.group({
      id: [''],
      gasto: [''],
      descricao: [''],
      parcelas: [''],
      valorParcelas: [''],
      isParcelado: [false],
      valor: ['', Validators.required],
      total: ['1000'],
    });

    return form;
  }

  editarFinanca() {
    this._activated.params.subscribe(params => {
      this.id = params['id'],
      this.service.findById(this.id).subscribe(response => {
        this.form.setValue(response);
      })
    })
  }

  onSubmit() {
    this.service.salvar(this.form.value).subscribe();
    this.comeBack();
  }

  comeBack() {
    this.router.navigateByUrl('financas/pessoais')
  }

}

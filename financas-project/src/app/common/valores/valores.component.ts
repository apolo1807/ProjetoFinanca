import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'valores-component',
  templateUrl: 'valores.component.html'
})

export class ValoresComponent implements OnInit {

  @Input() form:FormGroup;
  @Input() anual: boolean;

  anualArray: string[] = ['1 ano', '2 anos', '3 anos', '4 anos', '5 anos'];
  mensalArray: string[] = ['2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x', '11x', '12x'];
  escolhido: string[] = [];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    if(!this.form) {
      this.form = this.createForm();
    }
    this.parcelasAnuais();
  }

  parcelasAnuais() {
    this.anual? this.escolhido = this.anualArray : this.escolhido = this.mensalArray;
  }

  private createForm():FormGroup {

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

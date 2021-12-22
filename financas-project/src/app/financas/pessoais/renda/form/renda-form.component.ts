import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RendaService } from '../renda.service';

@Component({
  selector: 'app-renda-fixa',
  templateUrl: './renda-form.component.html',
  styleUrls: ['renda-form.component.css']
})
export class RendaFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RendaService
  ) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  createForm():FormGroup {

    const form = this.formBuilder.group({
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
      console.log(response);

      this.form.reset();
    }, error => {

    })
  }

  compareWith() {
    return this.form.get('tipoRenda')?.value == "id";
  }

}

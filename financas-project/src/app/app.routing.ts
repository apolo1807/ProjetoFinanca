import { Routes } from '@angular/router';
import { FinancaPessoalComponent } from './financas/pessoais/financa-pessoal.component';
import { PessoalFormComponent } from './financas/pessoais/form/pessoal-form.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'financas/pessoais', component: FinancaPessoalComponent},
  {path: 'financas/pessoais/:id', component: PessoalFormComponent},
  {path: 'financas/pessoais/new', component: PessoalFormComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomePageComponent},
]

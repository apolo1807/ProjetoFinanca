import { Routes } from '@angular/router';
import { FinancaPessoalComponent } from './financas/pessoais/financa-pessoal.component';
import { PessoalFormComponent } from './financas/pessoais/form/pessoal-form.component';
import { RendaFormComponent } from './financas/pessoais/renda/form/renda-form.component';
import { RendaListComponent } from './financas/pessoais/renda/renda-list/renda-list.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'financas/pessoais', component: FinancaPessoalComponent},
  {path: 'financas/pessoais/new', component: PessoalFormComponent},
  {path: 'financas/pessoais/:id', component: PessoalFormComponent},
  {path: 'financas/pessoais/renda/list', component: RendaListComponent },
  {path: 'financas/pessoais/renda/new', component: RendaFormComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomePageComponent},
]

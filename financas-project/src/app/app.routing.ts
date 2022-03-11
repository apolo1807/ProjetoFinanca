import { Routes } from '@angular/router';
import { PessoalFormComponent } from './financas/pessoais/financas/form/pessoal-form.component';
import { FinancaPessoalComponent } from './financas/pessoais/financas/list/financa-pessoal.component';
import { GastosFormComponent } from './financas/pessoais/gastos/form/gastos-form.component';
import { GastosComponent } from './financas/pessoais/gastos/gastos-list/gastos.component';
import { RendaFormComponent } from './financas/pessoais/renda/form/renda-form.component';
import { RendaListComponent } from './financas/pessoais/renda/renda-list/renda-list.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'financas/pessoais', component: FinancaPessoalComponent},
  {path: 'financas/pessoais/new', component: PessoalFormComponent},
  {path: 'financas/pessoais/:id', component: PessoalFormComponent},
  {path: 'financas/pessoais/renda/list', component: RendaListComponent},
  {path: 'financas/pessoais/renda/new', component: RendaFormComponent},
  {path: 'financas/pessoais/renda/list/:id', component: RendaFormComponent},
  {path: 'financas/pessoais/gastos/list', component: GastosComponent },
  {path: 'financas/pessoais/gastos/new', component: GastosFormComponent },
  {path: 'financas/pessoais/gastos/list/:id', component: GastosFormComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomePageComponent},
]

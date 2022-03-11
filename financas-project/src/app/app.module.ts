import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './home-page/charts/investimentos/charts.component';
import { ChartCriptomoedaComponent } from './home-page/charts/crypto/charts-cripto.component';
import { AccountStaticsComponent } from './financas/pessoais/estatistica/account-static.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { FinancaEmpresarialComponent } from './financas/empresarial/financa-empresarial.component';
import { NavbarFinancaComponent } from './financas/navbar/navbar.component';
import { PessoalFormComponent } from './financas/pessoais/financas/form/pessoal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './financas/pessoais/financas/shared/financas-pessoais.service';
import { HttpClientModule } from '@angular/common/http';
import { PipeModule } from './shared/Validators/pipe.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RendaFormComponent } from './financas/pessoais/renda/form/renda-form.component';
import { RendaListComponent } from './financas/pessoais/renda/renda-list/renda-list.component';
import { ValorDolarComponent } from './shared/notification/valor-dolar/valor-dolar.component';
import { NotificationComponent } from './notification/notification.component';
import { GastosComponent } from './financas/pessoais/gastos/gastos-list/gastos.component';
import { GastosFormComponent } from './financas/pessoais/gastos/form/gastos-form.component';
import { FinancaPessoalComponent } from './financas/pessoais/financas/list/financa-pessoal.component';
import { ValoresComponent } from './common/valores/valores.component';
import { ValoresModule } from './common/valores/valores.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AccountStaticsComponent,
    ChartComponent,
    ChartCriptomoedaComponent,
    NavbarComponent,
    FinancaPessoalComponent,
    FinancaEmpresarialComponent,
    NavbarFinancaComponent,
    PessoalFormComponent,
    RendaFormComponent,
    RendaListComponent,
    ValorDolarComponent,
    NotificationComponent,
    GastosComponent,
    GastosFormComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    AppRoutingModule,
    NgChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PipeModule,
    ValoresModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

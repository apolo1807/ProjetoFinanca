import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './home-page/charts/investimentos/charts.component';
import { ChartCriptomoedaComponent } from './home-page/charts/mediaPopulacao/charts-cripto.component';
import { AccountStaticsComponent } from './financas/pessoais/estatistica/account-static.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { FinancaPessoalComponent } from './financas/pessoais/financa-pessoal.component';
import { FinancaEmpresarialComponent } from './financas/empresarial/financa-empresarial.component';
import { NavbarFinancaComponent } from './financas/navbar/navbar.component';
import { PessoalFormComponent } from './financas/pessoais/form/pessoal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

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
    PessoalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

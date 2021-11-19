import { Component } from '@angular/core';

@Component({
  selector: 'charts',
  templateUrl: 'charts.component.html'
})

export class ChartComponent {

  constructor() { }  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Tesouro Direto', 'CDI(2021)', 'Fundos Imobiliários(média)', 'CDB', 'Tesouro Selic'];
  public barChartType = 'bar';
  public barChartLegend = true;  public barChartData = [
    {data: [7.99, 7.65, 7.22, 5.07, 5.25 ], label: 'Valores(% ao ano)'}
  ];  ngOnInit() { }

}

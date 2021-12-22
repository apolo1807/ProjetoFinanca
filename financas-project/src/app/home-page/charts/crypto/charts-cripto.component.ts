import { Component } from '@angular/core';

@Component({
  selector: 'charts-cripto',
  templateUrl: 'charts-cripto.component.html'
})

export class ChartCriptomoedaComponent {

  constructor() { }  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Bitcoin', 'Ethereum', 'XRP', 'Litecoin', 'EOS'];
  public barChartLegend = true;  public barChartData = [
    {data: [335991.82, 24337.95, 6.28, 1076.40, 24.38 ], label: 'Preço'}
  ];  ngOnInit() { }
}

import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  Bardata:any
  
  constructor() { }

  ngOnInit() {
    setTimeout(() => {

      this.doughnutChart = this.getDoughnutChart();
      this.lineChart = this.getLineChart();

    }, 3000);
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
  }

  getDoughnutChart() {
    let data = {
      labels: ["Red", "Brown", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(244, 164, 96, 0.8)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: ["#FF6384", "#551a8b", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
      }]
    };

    return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
  }

  getLineChart() {
    var data = {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets: [
        {
          label: "Initial Dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
            data: [{x: 2,y: 59}, {x: 2.3, y: 81},{x: 2.9, y: 55},{x: 4,y: 59}, {x: 5.2, y: 81},{x: 5.8, y: 55},{x: 6.5,y: 59}, {x: 8.3, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55},{x: 65,y: 59}, {x: 80, y: 81},{x: 56, y: 55}],
          spanGaps: false,
        },
        {
          label: "Final Dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(175,92,192,0.4)",
          borderColor: "rgba(31,156,156,1)",
          borderCapStyle: 'butt',
          borderDash: [5, 8],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(31,156,156,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(31,156,156,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [15, 39, 50, 81, 51, 55, 30, 70],
          spanGaps: false,
        }
      ]
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }
}



import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

import * as moment from 'moment';
import { DonutService } from '../services/donut.service';


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

  linecollection: AngularFirestoreCollection;
  linedoc;


  lineArrayace;
  lineArrayco;
  lineArrayco2;
  lineArraynh4;
  lineArraytol;
  lineArrayeth;
  lineArrayhum;
  lineArraytem;
  start:Boolean;  
  donutArray;
  loading;
  constructor(public afs: AngularFirestore,public donut: DonutService, public loadingController: LoadingController) {
    console.log(donut.returnArr())
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Crunching Numbers',
      spinner: 'bubbles'
    });
    await this.loading.present();

    // const { role, data } = await this.loading.onDidDismiss();

    console.log('Loading dismissed!');
  }


  async ngOnInit() {
    this.linecollection = this.afs.collection('regression');
    this.linedoc = this.linecollection.doc('reg').get();
    this.lineArrayace = [];
    this.lineArrayco = [];
    this.lineArrayco2 = [];
    this.lineArraynh4 = [];
    this.lineArraytol = [];
    this.lineArrayeth = [];
    this.lineArrayhum = [];
    this.lineArraytem = [];
    console.log("babyyy sharkkk")
    this.presentLoading();
    this.linedoc.subscribe((value) => {
      for (let i = 0; i < value.data().time.length; i++) {
        this.lineArrayace.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().ace[i] })
        this.lineArrayco.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().co[i] })
        this.lineArrayco2.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().co2[i] })
        this.lineArraynh4.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().nh4[i] })
        this.lineArraytol.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().tol[i] })
        this.lineArrayeth.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().eth[i] })
        this.lineArrayhum.push({ x: moment(value.data().time[i], "HH:mm:ss").format("HH:mm"), y: value.data().humidity[i] })
        console.log("do")
      }
      this.loading.dismiss();
      this.startchart()
    });
  }

  startchart(){
    setTimeout(() => {
      this.doughnutChart = this.getDoughnutChart();
      this.lineChart = this.getLineChart();

    }, 1000);
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
      labels: ["CO", "CO\u2082", "NH\u2084", "Ethanol", "Acetone", "Toluene"],
      datasets: [{
        label: 'Proportions',
        data: this.donut.donutArray,
        backgroundColor: [
          'rgb(255, 102, 102)',
          'rgb(204, 51, 153)',
          'rgb(0, 204, 102)',
          'rgb(255, 153, 0)',
          'rgb(51, 153, 255)',
          'rgb(0, 102, 153)'
        ]
      }]
    };
    return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
  }

  getLineChart() {
    var labels = this.lineArrayace.map(e => e.x);
    var data = {
      labels: labels,
      datasets: [
        {
          label: "Acetone",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(51, 153, 255)",
          borderColor: "rgb(51, 153, 255)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgb(51, 153, 255)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(51, 153, 255)",
          pointHoverBorderColor: "rgb(51, 153, 255)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArrayace,
          spanGaps: false,
        },
        {
          label: "Carbon Monoxide",
          options: {

            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(255, 102, 102)",
          borderColor: "rgb(255, 102, 102)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgb(255, 102, 102)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(255, 102, 102)",
          pointHoverBorderColor: "rgb(255, 102, 102)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArrayco,
          spanGaps: false,
        },
        {
          label: "Carbon Dioxide",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(204, 51, 153)",
          borderColor: "rgb(204, 51, 153)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          pointBorderColor: "rgb(204, 51, 153)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(204, 51, 153)",
          pointHoverBorderColor: "rgb(204, 51, 153)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArrayco2,
          spanGaps: false,
        },
        {
          label: "Ammonia",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(0, 204, 102)",
          borderColor: "rgb(0, 204, 102)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          borderJoinStyle: 'miter',
          pointBorderColor: "rgb(0, 204, 102)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 204, 102)",
          pointHoverBorderColor: "rgb(0, 204, 102)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArraynh4,
          spanGaps: false,
        },
        {
          label: "Ethanol",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(255, 153, 0)",
          borderColor: "rgb(255, 153, 0)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          borderJoinStyle: 'miter',
          pointBorderColor: "rgb(255, 153, 0)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(255, 153, 0)",
          pointHoverBorderColor: "rgb(255, 153, 0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArrayeth,
          spanGaps: false,
        },
        {
          label: "Toluene",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(0, 102, 153)",
          borderColor: "rgb(0, 102, 153)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          borderJoinStyle: 'miter',
          pointBorderColor: "rgb(0, 102, 153)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 102, 153)",
          pointHoverBorderColor: "rgb(0, 102, 153)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArraytol,
          spanGaps: false,
        },
        {
          label: "Humidity",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(0, 102, 153)",
          borderColor: "rgb(0, 102, 153)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          options: {
            // responsive: true,
            // maintainAspectRatio: false,
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    quarter: 'h:mm'
                  }
                }
              }]
            }
          },
          borderJoinStyle: 'miter',
          pointBorderColor: "rgb(0, 102, 153)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 102, 153)",
          pointHoverBorderColor: "rgb(0, 102, 153)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.lineArrayhum,
          spanGaps: false,
        }
      ]
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }
}



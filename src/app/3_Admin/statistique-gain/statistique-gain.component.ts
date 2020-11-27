import { ComptabiliteService } from './../../service/comptabilite/comptabilite.service';
import { Comptabilite } from './../../model/Comptabilite';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistique-gain',
  templateUrl: './statistique-gain.component.html',
  styleUrls: ['./statistique-gain.component.scss']
})
export class StatistiqueGainComponent implements OnInit {
  // Paramètres du graphique
  public lineChartData: Array<any> = [
    { data: [], label: 'Gain par mois' },
    { data: [], label: 'Gain par semaine' }
  ];
  public lineChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  //////////////


  listCompta: Comptabilite[]
  gainSemaine: number[] = []
  gainMois: number[] = []
  constructor(private comptabiliteService: ComptabiliteService) { }

  ngOnInit() {
    this.recupererComptabilite()

  }

  recupererComptabilite() {
    this.comptabiliteService.getComptabilites().subscribe(comptas => {
      this.listCompta = comptas
      
      var now = Date.now();
      comptas.forEach(compta => {
        var dateCompta = new Date(compta.date)
        console.log(dateCompta);
        var difference_In_Days = Math.round((now - dateCompta.getTime()) / (1000 * 3600 * 24));
        
        if (this.gainSemaine[Math.trunc(difference_In_Days / 7)]) {
          this.gainSemaine[Math.trunc(difference_In_Days / 7)] += compta.gain
        } else {
          this.gainSemaine[Math.trunc(difference_In_Days / 7)] = compta.gain
        }

        if (this.gainMois[Math.trunc(difference_In_Days / 30)]) {
          this.gainMois[Math.trunc(difference_In_Days / 30)] += compta.gain
        } else {
          this.gainMois[Math.trunc(difference_In_Days / 30)] = compta.gain
        }
      })
      this.lineChartData[0].data = this.gainMois
      this.lineChartData[1].data = this.gainSemaine
    })
  }
}

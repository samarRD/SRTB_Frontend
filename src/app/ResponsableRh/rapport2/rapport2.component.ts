import { Component } from '@angular/core';
import { Rapport2Service } from 'src/app/service/rapport2.service';
import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';

@Component({
  selector: 'app-rapport2',
  templateUrl: './rapport2.component.html',
  styleUrls: ['./rapport2.component.css']
})
export class Rapport2Component {
  constructor(private rs : Rapport2Service , private vs : VehiculeServiceService) { }
  vehiculeData : any =[];
  vehiculeSelected : number = 0;
  DaySelected!: String ;
  Day2Selected!: String ;
  ListDay : any =[];
  ListPerformance: any =[];
  Rapport2 : any =[];
  PerformanceRapport : any =[];
  Performance: any =[];
  Rapport1 : any = [] ;
  isDaySelected = false;
  isDay2Selected = false;

  ngOnInit(): void {
    this.refreshVehicules()
  }

  refreshVehicules(){
    this.vs.getAll().subscribe((res:any) => {
      this.vehiculeData = res;
    })
  }


  vehiculeChanged(i :EventTarget | null){
    this.ListDay = [];
    this.rs.get(this.vehiculeSelected).subscribe((res : any)=>{
      this.ListPerformance = res;
      res.forEach((element: { performanceJour: any; }) => {
        this.ListDay.push(element.performanceJour) //extraire la valeur de la proprieté performanceJour et l'ajouter au ListDay
      });
      this.laodPerf() ;
    })
  }


  laodPerf(){
    this.Rapport1 = [];
    const r = {
      "taux_consommation":0
  }
  this.ListPerformance.forEach((element: {  taux_consommation: number; }) => {
    r.taux_consommation =parseFloat((r.taux_consommation + element.taux_consommation).toFixed(2));
   });
    this.Rapport1 = r;
  }

//pour recuperer le rapport d'un chauffeur pendant le jour sélecttionnés
  DayChanged(i :EventTarget | null){
    this.Performance = [];
    this.rs.getPerfDay(this.vehiculeSelected,this.DaySelected).subscribe((res : any)=>{
    this.Performance=res;})
      this.isDaySelected = true;
      this.isDay2Selected = false;
      }

//pour recuperer le rapport d'un chauffeur pendant deux dates sélecttionnés
  Day2Changed(i :EventTarget | null){
    this.PerformanceRapport = [];
    this.rs.getPerfDay2(this.vehiculeSelected, this.DaySelected,this.Day2Selected).subscribe((res : any)=>{
    this.PerformanceRapport=res;
    this.laodPerf2();
    })
    this.isDaySelected = false;
    this.isDay2Selected = true;
  }


  laodPerf2(){
    this.Rapport2 = [];
    const rap = {
      "taux_consommation":0,
      "consommation_carburant":0.0,
      "kilometrage" :0
  }
  this.PerformanceRapport.forEach((element: {  consommation_carburant: number; }) => {
    rap.consommation_carburant =rap.consommation_carburant + element.consommation_carburant;
    });

  this.PerformanceRapport.forEach((element: {  kilometrage: number; }) => {
    rap.kilometrage =rap.kilometrage + element.kilometrage;
    });
  rap.taux_consommation = parseFloat(((rap.consommation_carburant / rap.kilometrage ) * 100).toFixed(2));
      this.Rapport2 = rap;
  }




}


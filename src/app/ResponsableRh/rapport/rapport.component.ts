import { Component } from '@angular/core';
import { RapportService } from 'src/app/service/rapport.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})

export class RapportComponent {
  constructor(private us: UserService,private rs : RapportService) { }
  userData : any =[];
  userSelected : number = 0;
  DaySelected!: String ;
  ListDay : any =[];
  ListPerformance: any =[];
  Performance: any =[];
  Rapport : any = [] ;
  ngOnInit(): void {
    this.refreshUsers()
  }

  refreshUsers(){
    this.us.getAll().subscribe(res => {
      res.forEach((user: any) => {
        if(user.role === "Chauffeur" && user.status !== false){
          this.userData.push(user);}});});
  }
  laodPerf(){
    this.Rapport = [];
    const r = {"nbrHH": 0}
     this.ListPerformance.forEach((element: {  nbrHH: number; }) => {
        r.nbrHH = r.nbrHH + element.nbrHH;
    });
    this.Rapport = r;
  }
  // renvoyer le nombre totales des heures travaillé par le chauffeur et rempli le tableau listDay par les jours travaillés
  userChanged(){
    this.ListDay = [];
    this.rs.get(this.userSelected).subscribe((res : any)=>{
      this.ListPerformance = res;
      res.forEach((element: { performanceJour: any; }) => {
        this.ListDay.push(element.performanceJour) //Ajoute la valeur de la propriété "performanceJour" à la liste "ListDay"
      });
      this.laodPerf() ;
    })
  }
// recuperer le rapport d'un chauffeur dans le jour sélectionnées
  DayChanged(){
    this.Performance = [];
    this.rs.getPerfDay(this.userSelected,this.DaySelected).subscribe((res : any)=>{
    this.Performance=res;
    })
  }

  getHoursAndMinutes(nbrHH: number): string {
    const hours = Math.floor(nbrHH);
    const minutes =Math.round ((nbrHH - hours)*100);
    return hours + ' h et ' + minutes + ' min';
  }

}

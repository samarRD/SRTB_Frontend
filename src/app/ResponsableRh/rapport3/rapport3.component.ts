import { Component } from '@angular/core';
import { Rapport3Service } from 'src/app/service/rapport3.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rapport3',
  templateUrl: './rapport3.component.html',
  styleUrls: ['./rapport3.component.css']
})
export class Rapport3Component {
  constructor(private us: UserService,private rs : Rapport3Service) { }
  userData : any =[];
  userSelected : number = 0;
  DaySelected!: String ;
  Day2Selected!: String ;
  ListDay : any =[];
  ListPerformance: any =[];
  Performance: any =[];
  services : any =[] ;
  Rapport : any = [] ;
  isDaySelected = false;
  isDay2Selected = false;
  Rapport3: any =[];
  PerformanceRapport : any =[];
  ngOnInit(): void {
    this.refreshUsers()
  }
  //get All users
  refreshUsers(){
    this.us.getAll().subscribe(res => {
      res.forEach((user: any) => {
        if(user.role === "Chauffeur" && user.status !== false){
          this.userData.push(user);
        }
      });
      });
  }


  userChanged(i: EventTarget | null) {
    this.ListDay = [];
    this.rs.get(this.userSelected).subscribe((res: any) => {
      this.ListPerformance = res;

      res.forEach((element: { date: any; }) => {
        this.ListDay.push(element.date);
      });
      // Utiliser la méthode filter() pour supprimer les doublons et conserver une seule occurrence de chaque date
      this.ListDay = this.ListDay.filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index);
      //vérifie si l'index de la première occurrence de l'élément dans le tableau est égal à l'index actuel. Cela permet de garder uniquement la première occurrence de chaque valeur dans le tableau filtré.
    });
  }


  Day2Changed(){
    this.PerformanceRapport = [];
    this.rs.getPerfDay2(this.userSelected, this.DaySelected,this.Day2Selected).subscribe((res : any)=>{
    this.PerformanceRapport=res;
    })
    this.isDay2Selected = true;
  }

  getTotalRecette() {
    let recette = 0;
    for (let p of this.PerformanceRapport) {
      recette += p.recette;
    }
    return recette;
  }
  getTotalKilometrage() {
    let k = 0;
    for (let p of this.PerformanceRapport) {
      k += p.kilometrage;
    }
    return k;
  }


}

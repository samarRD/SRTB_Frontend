import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent {
  notifications: string[] = [];
  constructor(private vehiculeService:VehiculeServiceService ){
  }

  Classvehicule ="";
  isSubmitted:boolean=false;
  vehiculeData : any =[];
  VehiculeFilter:string="";
  VehiculesListWithoutFilter:any=[];
  Modifierform!: FormGroup;
   C : any =[];

   ngOnInit(): void {

    this.refreshVehicules();
  }

  refreshVehicules(){
    this.vehiculeService.getAll().subscribe(res => {
      res.forEach((vehicule: any) => {// La méthode forEach() est utilisée pour itérer sur chaque véhicule dans les résultats.
        if(vehicule.status === false) {
          this.vehiculeData.push(vehicule);

        }
      });

      });
  }

  FilterFn(){
    var Filter = this.VehiculeFilter;
    this.vehiculeData = this.VehiculesListWithoutFilter.filter(function(el:any){
      return el.matricule.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  fonctionnel(vehicule : any){
    vehicule.status = true;
    this.vehiculeService.UpdateV(vehicule).subscribe((data) => {

    });

  }

  Rstatus(status:any){
    if(status == true){
      this.Classvehicule = "badge badge-success"
      return "Fonctionnel"
    }
    else if (status == false) {
      this.Classvehicule = "badge badge-danger"
      return "panne"
    }
    else{
      this.Classvehicule = "badge badge-success"
      return "Fonctionnel"
    }
  }

}






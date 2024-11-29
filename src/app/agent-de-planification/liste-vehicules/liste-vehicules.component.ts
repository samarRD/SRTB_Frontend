import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';

@Component({
  selector: 'app-liste-vehicules',
  templateUrl: './liste-vehicules.component.html',
  styleUrls: ['./liste-vehicules.component.css'],

})
export class ListeVehiculesComponent {
  constructor(private vehiculeService:VehiculeServiceService  ){}
  Classvehicule : any;
  isSubmitted:boolean=false;
  vehiculeData : any =[];
  VehiculeFilter:string="";
  VehiculesListWithoutFilter:any=[];
  Modifierform!: FormGroup;
   C : any =[];

 ngOnInit(): void {
    this.refreshVehicules();
  }

  setForm(i :number ){
    this.Modifierform = new FormGroup({
       description : new FormControl(this.C[i].description),
      },
    );
    return this.Modifierform
    }


  refreshVehicules(){
    this.vehiculeService.getAll().subscribe((res:any) => {
      this.vehiculeData = res;
      this.VehiculesListWithoutFilter=res;

    for(let i=0 ; i< this.vehiculeData.length ; i++)
    {
       this.vehiculeService.get(this.vehiculeData[i].id).subscribe((data) => {
       this.C[i] = data;
    });
    }
  });
  }
  update(i:number) {
    const updatedVehicule = this.vehiculeData[i];
    updatedVehicule.description = this.setForm(i).get('description')?.value;
    this.vehiculeService.UpdateV(updatedVehicule).subscribe((data) => {
      alert('panne ajouté');
    });

  }
  FilterFn(){
    var Filter = this.VehiculeFilter;
    this.vehiculeData = this.VehiculesListWithoutFilter.filter(function(v:any){
      return v.matricule.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }
  panne(vehicule : any){
    vehicule.status = false;
    this.vehiculeService.UpdateV(vehicule).subscribe((data) => {

    });

  }

  Rstatus(status:any){
    if(status == true ){
      this.Classvehicule = "badge badge-success"
      return "Fonctionnel"
    }
    else if (status == false) {
      this.Classvehicule = "badge badge-danger"
      return "panne "
    }
    else{
      this.Classvehicule = "badge badge-warning"
      return "jamais réparée"
    }
  }

  get description(){
    return this.Modifierform.get("description");
  }
}




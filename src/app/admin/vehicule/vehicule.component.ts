import { MarqueService } from './../../service/marque.service';
import { VehiculeServiceService } from './../../service/vehicule-service.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeService } from 'src/app/service/type.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent {
constructor(private vehiculeService:VehiculeServiceService ,private typeService:TypeService,private marqueService: MarqueService ){}
Ajouterform!: FormGroup;
isSubmitted:boolean=false;
vehiculeData : any =[];
VehiculeFilter:string="";
VehiculesListWithoutFilter:any=[];
TypeData : any =[];
TypeFilter:string="";
MarqueData : any =[];
MarqueFilter:string="";




ngOnInit(): void {

  this.Ajouterform= new FormGroup({
    matricule:new FormControl('',[Validators.required]),
    datemise_enmarche :new FormControl('',[Validators.required]),
    taux_consommation:new FormControl('',[Validators.required]),
    id_marque :new FormControl('',[Validators.required]),
    id_type :new FormControl('',[Validators.required]),
   },
  )
     this.refreshVehicules();
     this.refreshMarques();
     this.refreshTypes();
    }

refreshVehicules(){
  this.vehiculeService.getAll().subscribe((res:any) => {
    this.vehiculeData = res;
    this.VehiculesListWithoutFilter=res;

  })

}
refreshTypes(){
  this.typeService.getAll().subscribe((res:any) => {
    this.TypeData = res;
  })

}

refreshMarques(){
  this.marqueService.getAll().subscribe((res:any) => {
    this.MarqueData = res;
  })

}
//confiramtion du compte
delete(id : number){
 if(confirm("Êtes-vous sûr de supprimer cette vehicule?")){
   this.vehiculeService.Delete(id).subscribe(res => {
     this.refreshVehicules();
   })
 }
}

FilterFn(){
  var Filter = this.VehiculeFilter;
  this.vehiculeData = this.VehiculesListWithoutFilter.filter(function(vehicule:any){
    return vehicule.matricule.toString().toLowerCase().includes(
      Filter.toString().trim().toLowerCase()
    )
  });
}

createVehicule(){
  this.isSubmitted = true;
  if(!this.Ajouterform.invalid){
  const vehicule = {
      "datemise_enmarche": moment(this.datemise_enmarche?.value).format('DD-MM-YYYY'),
      "matricule": this.matricule?.value,
      "taux_consommation": this.taux_consommation?.value
    }
  this.vehiculeService.create(vehicule , this.id_type?.value , this.id_marque?.value).subscribe((res : any) => {
    alert('Vehicule ajoutée avec succée');
    this.refreshVehicules();
  });


}

}
get matricule(){
  return this.Ajouterform.get("matricule");
}
get datemise_enmarche(){
  return this.Ajouterform.get("datemise_enmarche");
}
get taux_consommation(){
  return this.Ajouterform.get("taux_consommation");
}
get id_type(){
  return this.Ajouterform.get("id_type");
}
get id_marque(){
  return this.Ajouterform.get("id_marque");
}

}



import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';
import { VoyageServiceService } from '../../service/voyage-service.service';
import { UserService } from 'src/app/service/user.service';
import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent {

  r!: boolean;
  v!: boolean;
  Ajouterform!: FormGroup;
  Modifierform !:FormGroup ;
  isSubmitted:boolean=false;
  voyageData : any =[];
  voyageFilter:string="";
  voyageListWithoutFilter:any=[];
  vehiculeData : any =[];
  vehiculerData : any =[];
  vehiculeListWithoutFilter:any=[];
  serviceData :any =[];
  serviceListWithoutFilter:any=[];
  userData :any =[];
  userrData :any =[];
  userListWithoutFilter:any=[];
  C : any =[];
  selectedUserRealiseId : any =[];
  selectedVehiculeRealiseId : any =[];
  constructor( private VoyageService:VoyageServiceService,private service:ServiceService ,private user:UserService ,private vehicule:VehiculeServiceService  ){

  }
  ngOnInit(): void {
    this.Ajouterform= new FormGroup({
     id_user: new FormControl('', [Validators.required]),
     id_vehicule : new FormControl('', [Validators.required]),
     id_service : new FormControl('', [Validators.required]),
     date : new FormControl('', [Validators.required]) ,
     },
    )
        this.getVoyages();
        this.refreshServices();
        this.refreshUsers();
        this.refreshVehicules();
      }
  setForm(i :number ){
    this.Modifierform = new FormGroup({
       rect: new FormControl(this.C[i].recette),
       nbr: new FormControl(this.C[i].nbr_voyageur),
       heure_depart :new FormControl(this.C[i].service.heure_depart),
       heure_arrive :new FormControl(this.C[i].service.heure_arrive),
       service_id:new FormControl(this.C[i].service.libelle),
       user_id: new FormControl(this.C[i].user.username),
       vehicule_id : new FormControl(this.C[i].vehicule.matricule),
       date_voyage : new FormControl(this.C[i].date),
       userrealise_id : new FormControl(this.selectedUserRealiseId[i]),
       vehiculerealise_id :new FormControl(this.selectedVehiculeRealiseId[i]) ,
      },
    );
    return this.Modifierform;
  }


   getVoyages() {
        this.VoyageService.getAll().subscribe((res: any) => {
          this.voyageData = res;
          this.voyageListWithoutFilter =res;
        for(let i=0 ; i< this.voyageData.length ; i++)
        {
           this.VoyageService.get(this.voyageData[i].id).subscribe((data) => {
           this.C[i] = data;
           this.selectedUserRealiseId[i]= this.C[i]?.userrealise?.id;
           this.selectedVehiculeRealiseId[i] = this.C[i]?.vehiculerealise?.id;
        });
        }
});


         }



  refreshServices(){
    this.service.getAll().subscribe((res:any) => {
      this.serviceData = res;

    })
  }



  refreshVehicules(){
    this.vehicule.getAll().subscribe((res:any) => {
      res.forEach((vehicule: any) => {
        if(vehicule.status !== false){
          this.vehiculeData.push(vehicule);
          this.vehiculerData.push(vehicule);
        }
      });

      });

  }
  refreshUsers(){
    this.user.getAll().subscribe(res => {
      res.forEach((user: any) => {
        if(user.role === "Chauffeur" && user.status !== false){
          this.userData.push(user);
          this.userrData.push(user);
        }
      });

      });
  }


  delete(id : number){
   if(confirm("Êtes-vous sûr de supprimer ce voyage ?")){
     this.VoyageService.Delete(id).subscribe(res => {
       this.getVoyages();
     })
   }
  }

  FilterFn(){
    var Filter = this.voyageFilter;
    this.voyageData = this.voyageListWithoutFilter.filter(function(voyage:any){
      return voyage.id.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createVoyage(){
    console.log;
    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){
    const voyage = {
        "date": moment(this.date?.value).format('DD-MM-YYYY'),
      }

    this.VoyageService.create(voyage , this.id_user?.value , this.id_service?.value , this.id_vehicule?.value ).subscribe((res : any) => {
      alert('voyage ajoutée avec succée');
      this.getVoyages();
    });


  }

  }

    isInputDisabled = true;
    choisir(valeur: string) {
      this.isInputDisabled = false;
      if (valeur === 'realisation') {
        this.r = true;
      } else {
        this.r = false;
      }

      if (valeur === 'validation') {
        this.v = true;
      } else {
        this.v = false;
      }
    }


    update(i:number) {
       // Récupération du voyage à mettre à jour à l'index `i`
      const updatedVoyage = this.voyageData[i];
      if (updatedVoyage.userrealise) {
         // Si `userrealise` existe, met à jour `userrealise.id` avec la valeur du champ `userrealise_id` du formulaire
        updatedVoyage.userrealise.id = this.setForm(i).get('userrealise_id')?.value;
      } else {
        // Si `userrealiseddd` n'existe pas, crée un nouvel objet avec `id` égal à la valeur du champ `userrealise_id` du formulaire et l'assigne à `userrealise`
        updatedVoyage.userrealise = { id: this.setForm(i).get('userrealise_id')?.value };
      }
      if (updatedVoyage.vehiculerealise) {
        updatedVoyage.vehiculerealise.id = this.setForm(i).get('vehiculerealise_id')?.value;
      } else {
        updatedVoyage.vehiculerealise = { id: this.setForm(i).get('vehiculerealise_id')?.value };
      }

          this.VoyageService.update( updatedVoyage, updatedVoyage.userrealise.id ,  updatedVoyage.vehiculerealise.id ).subscribe((data) => {
            alert('voyage modifiée avec succés');
            this.getVoyages();
          });
      }

    updateV(i:number) {
      const updatedVoyage = this.voyageData[i];
        updatedVoyage.nbr_voyageur = this.setForm(i).get('nbr')?.value;
        updatedVoyage.recette = this.setForm(i).get('rect')?.value;
            this.VoyageService.updateV(updatedVoyage).subscribe((data) => {
              alert('voyage modifiée avec succés');
              this.getVoyages();
            });
        }
    role(){
      let role = this.user.getRole() as string;
        if(role == "Responsable recette"){
          return "Responsable recette";
          }
        else
          return "Agent de planification";
        }


    isUserAuthenticated() {
      const token: string = this.user.getJwt() as string;
        if (token != null) {
        return true;
          }
        else {
        return false;
         }
        }


//Ajouter
  get nbr_voyageur(){
    return this.Ajouterform.get("nbr_voyageur");
  }
  get recette(){
    return this.Ajouterform.get("recette");
  }
  get id_user(){
    return this.Ajouterform.get("id_user");
  }

  get id_vehicule(){
    return this.Ajouterform.get("id_vehicule");
  }
  get id_service(){
    return this.Ajouterform.get("id_service");
  }
  get date (){
    return this.Ajouterform.get("date");
  }

//Modifier
get nbr(){
  return this.Modifierform.get("nbr");
}
get rect(){
  return this.Modifierform.get("rect");
}
get user_id(){
  return this.Modifierform.get("user_id");
}

get vehicule_id(){
  return this.Modifierform.get("vehicule_id");
}
get service_id(){
  return this.Modifierform.get("service_id");
}
get heure_depart(){
  return this.Modifierform.get("heure_depart");
}
get heure_arrive(){
  return this.Modifierform.get("heure_arrive");
}
get userrealise_id(){

  return this.Modifierform.get("userrealise_id");
}

get vehiculerealise_id(){
  return this.Modifierform.get("vehiculerealise_id");
}

get date_voyage(){
  return this.Modifierform.get("date_voyage");
}




  }








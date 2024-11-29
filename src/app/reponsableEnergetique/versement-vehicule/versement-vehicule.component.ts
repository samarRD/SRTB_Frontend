import { VoyageServiceService } from './../../service/voyage-service.service';
import { VersementVehiculeService } from './../../service/versement-vehicule.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-versement-vehicule',
  templateUrl: './versement-vehicule.component.html',
  styleUrls: ['./versement-vehicule.component.css']
})
export class VersementVehiculeComponent {
  constructor(private vehiculeService:VehiculeServiceService , private  versementService:VersementVehiculeService , private voyageService:VoyageServiceService , private s : ServiceService){}

  isSubmitted:boolean=false;
  vehiculeData : any =[];
  voyageData : any =[];
  VehiculeFilter:string="";
  VoyageFilter:string="";
  versementData : any =[];
  VehiculesListWithoutFilter:any=[];
  VoyagesListWithoutFilter:any=[];
  Ajouterform!: FormGroup;
  servicesData : any =[];

   ngOnInit(): void {

    this.Ajouterform= new FormGroup({
      quantite_gasoil:new FormControl('',[Validators.required]),
      kilometrage_compteur :new FormControl('',[Validators.required]),


     },
    );
    this.refreshVoyages();
    this.refreshVersements();
    this.refreshServices();

      }

      refreshVoyages(){
        this.voyageService.getAll().subscribe((res:any) => {
          this.voyageData = res;
          this.VoyagesListWithoutFilter=res;
      });

      }
      refreshServices(){
        this.s.getAll().subscribe((res:any) => {
          this.servicesData = res;

      });
      }
        refreshVehicules(){
          this.vehiculeService.getAll().subscribe((res:any) => {
            this.vehiculeData = res;
            this.VehiculesListWithoutFilter=res;
        });
      }
      refreshVersements(){
        this.versementService.getAll().subscribe((res:any) => {
          this.versementData = res;

      });
      }

  FilterFn(){
    var Filter = this.VehiculeFilter;
    this.voyageData = this.VoyagesListWithoutFilter.filter(function(voyage:any){
      return voyage.vehiculerealise.matricule.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createVersement(id: any ,date :any){
    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){
       const versement = {
        "quantite_gasoil": this.quantite_gasoil?.value,
        "kilometrage_compteur": this.kilometrage_compteur?.value,
        "date":date,
      }
      this.versementService.create(versement,id).subscribe((data) => {
        alert('alimentation ajoutée');

      this.refreshVersements();

      });
    }
  }
  delete(id : number){
    if(confirm("Êtes-vous sûr de supprimer cette versement ?")){
      this.versementService.Delete(id).subscribe(res => {
        this.refreshVersements();
        this.refreshVehicules();
      })
    }
   }


  getServicesByDateAndMatricule(date: string, matricule: string): string[] {
    return this.voyageData
      .filter((voyage:any) => voyage.date === date && voyage.vehiculerealise.matricule === matricule)
      .map((voyage: any) => voyage.service.libelle);//la méthode map() est utilisée pour extraire les valeurs de la propriété libelle de chaque objet service dans le tableau filtré, et les stocker dans un nouveau tableau.
  }


getDistinctVoyages(): any[] {
  return this.voyageData.filter((v: { date: any; vehiculerealise: { matricule: any; }; },//La méthode filter() est utilisée pour filtrer les éléments du tableau voyageData en fonction de la condition donnée
     i: any, a: any[]) => a.findIndex(t => (t.date === v.date && t.vehiculerealise.matricule === v.vehiculerealise.matricule)) === i);
}
/* v représente l'élément courant du tableau.
   i représente l'index de l'élément courant.
   a représente le tableau complet.*/


/*La fonction findIndex() est utilisée pour trouver l'index
 du premier élément qui correspond à la condition donnée.
 La condition vérifie si la combinaison de la date et du matricule
 du véhicule de l'élément courant (v) correspond à la combinaison de
 la date et du matricule d'un autre élément (t) dans le tableau (a).

 Si l'index trouvé (findIndex()) correspond à l'index de l'élément courant (i),
  cela signifie que c'est le premier élément avec cette combinaison de date et
   de matricule. Donc, l'élément courant est conservé dans le tableau filtré.


 */
  get quantite_gasoil(){
    return this.Ajouterform.get("quantite_gasoil");
  }
  get kilometrage_compteur(){
    return this.Ajouterform.get("kilometrage_compteur");
  }
  get date(){
    return this.Ajouterform.get("date");
  }
  }







import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { UserService } from 'src/app/service/user.service';
import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';
import { VoyageServiceService } from 'src/app/service/voyage-service.service';

@Component({
  selector: 'app-travail',
  templateUrl: './travail.component.html',
  styleUrls: ['./travail.component.css']
})
export class TravailComponent {

  voyageData : any =[];
  vehiculeData : any =[];
  vehiculerData : any =[];
  serviceData :any =[];
  userData :any =[];
  userrData :any =[];
  selectedUserRealiseId : any =[];
  selectedVehiculeRealiseId : any =[];
  constructor( private VoyageService:VoyageServiceService,private service:ServiceService ,private user:UserService ,private vehicule:VehiculeServiceService  ){

  }

  ngOnInit(): void {
        this.getVoyages();
        this.refreshServices();
        this.refreshUsers();
        this.refreshVehicules();
      }
      getVoyages() {
        this.VoyageService.getAll().subscribe((res: any) => {
          this.voyageData = res;
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



  }








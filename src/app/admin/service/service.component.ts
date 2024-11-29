import { ArretService } from 'src/app/service/arret.service';
import { LigneService } from './../../service/ligne.service';
import { ServiceService } from './../../service/service.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  constructor(private service:ServiceService ,private ligneService: LigneService ){}
  Ajouterform!: FormGroup;
  isSubmitted:boolean=false;
  serviceData : any =[];
  LigneData : any =[];
  serviceFilter:string="";
  serviceListWithoutFilter:any=[];



  ngOnInit(): void {

    this.Ajouterform= new FormGroup({
     libelle:new FormControl('',[Validators.required]),
     id_ligne:new FormControl('',[Validators.required]),
     heure_depart :new FormControl('',[Validators.required]),
     heure_arrive :new FormControl('',[Validators.required]),

     },
    )

       this.refreshServices();
       this.refreshLignes()
      }

  refreshServices(){
    this.service.getAll().subscribe((res:any) => {
      this.serviceData = res;
      this.serviceListWithoutFilter=res;

    })

  }
  refreshLignes(){
    this.ligneService.getAll().subscribe((res:any) => {
      this.LigneData = res;


    })

  }

  //confiramtion du compte
  delete(id : number){
   if(confirm("Êtes-vous sûr de supprimer cet service ?")){
     this.service.Delete(id).subscribe(res => {
       this.refreshServices();
     })
   }
  }

  FilterFn(){
    var Filter = this.serviceFilter;
    this.serviceData = this.serviceListWithoutFilter.filter(function(service:any){
      return service.libelle.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createService(){

    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){
    const service = {
        "libelle": this.libelle?.value,
        "heure_depart" : this.heure_depart?.value,
        "heure_arrive" : this.heure_arrive?.value,

      }

    this.service.create(service,this.id_ligne?.value).subscribe((res : any) => {
      alert('service ajoutée avec succée');
      this.refreshServices();
    });


  }

  }
  get libelle(){
    return this.Ajouterform.get("libelle");
  }
  get heure_depart(){
    return this.Ajouterform.get("heure_depart");
  }
  get heure_arrive(){
    return this.Ajouterform.get("heure_arrive");
  }
  get id_ligne(){
    return this.Ajouterform.get("id_ligne");
  }
  }





import { LigneService } from './../../service/ligne.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArretService } from 'src/app/service/arret.service';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.css']
})
export class LigneComponent {
  constructor(private  ligneService:LigneService, private arret:ArretService  ){}
  Ajouterform!: FormGroup;
  isSubmitted:boolean=false;
  ligneData : any =[];
  ligneFilter:string="";
  ligneListWithoutFilter:any=[];
  ArretData : any =[];

  ngOnInit(): void {

    this.Ajouterform= new FormGroup({
      libelle:new FormControl('',[Validators.required]),
      kilometrage :new FormControl('',[Validators.required]),
      id_arretdepart:new FormControl('',[Validators.required]),
      id_arretarrivee:new FormControl('',[Validators.required]),
     },
    )
       this.refreshArret();
       this.refreshLignes()
      }

  refreshLignes(){
    this.ligneService.getAll().subscribe((res:any) => {
      this.ligneData = res;
      this.ligneListWithoutFilter=res;

    })

  }
  refreshArret(){
    this.arret.getAll().subscribe((res:any) => {
      this.ArretData = res;
    })

  }
  //confiramtion du compte
  delete(id : number){
   if(confirm("Êtes-vous sûr de supprimer cette ligne?")){
     this.ligneService.Delete(id).subscribe(res => {
       this.refreshLignes();
     })
   }
  }

  FilterFn(){
    var Filter = this.ligneFilter;
    this.ligneData = this.ligneListWithoutFilter.filter(function(el:any){
      return el.libelle.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createLigne(){

    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){
    const ligne = {
        "libelle": this.libelle?.value,
        "kilometrage": this.kilometrage?.value,

      }

    this.ligneService.create(ligne,this.id_arretdepart?.value ,this.id_arretarrivee?.value).subscribe((res : any) => {
      alert('ligne ajoutée avec succée');
      this.refreshLignes();
    });


  }

  }
  get libelle(){
    return this.Ajouterform.get("libelle");
  }
  get kilometrage(){
    return this.Ajouterform.get("kilometrage");
  }
  get id_arretdepart(){
    return this.Ajouterform.get("id_arretdepart");
  }
  get id_arretarrivee(){
    return this.Ajouterform.get("id_arretarrivee");
  }
  }





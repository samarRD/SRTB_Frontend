import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArretService } from 'src/app/service/arret.service';

@Component({
  selector: 'app-arret',
  templateUrl: './arret.component.html',
  styleUrls: ['./arret.component.css']
})
export class ArretComponent {
  constructor(private  arretService:ArretService  ){}
  Ajouterform!: FormGroup;
  isSubmitted:boolean=false;
    ArretData : any =[];
    ArretFilter:string="";
    ArretListWithoutFilter:any=[];


  ngOnInit(): void {

    this.Ajouterform= new FormGroup({
      libelle:new FormControl('',[Validators.required]),
     },
    )
       this.refreshArrets()

      }

  refreshArrets(){
    this.arretService.getAll().subscribe((res:any) => {
      this.ArretData = res;
      this.ArretListWithoutFilter=res;

    })

  }
  //confiramtion du compte
  delete(id : number){
   if(confirm("Êtes-vous sûr de supprimer cet arret?")){
     this.arretService.Delete(id).subscribe(res => {
       this.refreshArrets();
     })
   }
  }

  FilterFn(){
    var Filter = this.ArretFilter;
    this.ArretData = this.ArretListWithoutFilter.filter(function(el:any){
      return el.libelle.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createArret(){
    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){
    const Arret = {
        "libelle": this.libelle?.value,
      }
    this.arretService.create(Arret).subscribe((res : any) => {
      alert('Arret ajoutée avec succée');
      this.refreshArrets();
    });
  }

  }
  get libelle(){
    return this.Ajouterform.get("libelle");
  }



}

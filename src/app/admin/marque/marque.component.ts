import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarqueService } from 'src/app/service/marque.service';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent {
  constructor(private  marqueService:MarqueService  ){}
  Ajouterform!: FormGroup; //une classe d'Angular qui représente un groupe de contrôles de formulaire.
  isSubmitted:boolean=false;
  MarqueData : any =[];
  MarqueFilter:string="";
  MarqueListWithoutFilter:any=[];


  ngOnInit(): void {

    this.Ajouterform= new FormGroup({
      libelle:new FormControl('',[Validators.required]),
     },
    )
       this.refreshMarques()
      }

  refreshMarques(){
    this.marqueService.getAll().subscribe((res:any) => {
      this.MarqueData = res;
      this.MarqueListWithoutFilter=res;

    })

  }
  //confiramtion du compte
  delete(id : number){
   if(confirm("Êtes-vous sûr de supprimer cette Marque?")){
     this.marqueService.Delete(id).subscribe(res => {
       this.refreshMarques();
     })
   }
  }

  FilterFn(){
    var Filter = this.MarqueFilter;
    this.MarqueData = this.MarqueListWithoutFilter.filter(function(marque:any){
      return marque.libelle.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createMarque(){

    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){ //Cette condition vérifie si le formulaire (Ajouterform) contient des erreurs de validation
    const Marque = {
        "libelle": this.libelle?.value,
      }

    this.marqueService.create(Marque).subscribe((res : any) => {
      alert('Marque ajoutée avec succée');
      this.refreshMarques();
    });


  }

  }
  get libelle(){
    return this.Ajouterform.get("libelle");
  }


}

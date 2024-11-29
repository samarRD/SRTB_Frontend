import { Component } from '@angular/core';
import { TypeService } from '../../service/type.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent {
  constructor(private  typeService:TypeService  ){}
  Ajouterform!: FormGroup;
  isSubmitted:boolean=false;
  TypeData : any =[];
  TypeFilter:string="";
  TypeListWithoutFilter:any=[];


  ngOnInit(): void {
    this.Ajouterform= new FormGroup({
      libelle:new FormControl('',[Validators.required]),
      nbr_places:new FormControl('',[Validators.required]),
     },
    )
       this.refreshTypes()
      }

  refreshTypes(){
    this.typeService.getAll().subscribe((res:any) => {
      this.TypeData = res;
      this.TypeListWithoutFilter=res;

    })

  }
  //confiramtion du compte
  delete(id : number){
   if(confirm("Êtes-vous sûr de supprimer ce type?")){
     this.typeService.Delete(id).subscribe(res => {
       this.refreshTypes();
     })
   }
  }

  FilterFn(){
    var Filter = this.TypeFilter;
    this.TypeData = this.TypeListWithoutFilter.filter(function(el:any){
      return el.libelle.toString().toLowerCase().includes(
        Filter.toString().trim().toLowerCase()
      )
    });
  }

  createType(){

    this.isSubmitted = true;
    if(!this.Ajouterform.invalid){
    const Type = {
        "libelle": this.libelle?.value,
        "nbr_places":this.nbr_places?.value,
      }

    this.typeService.create(Type).subscribe((res : any) => {
      alert('type ajoutée avec succée');
      this.refreshTypes();
    });


  }

  }
  get libelle(){
    return this.Ajouterform.get("libelle");
  }

  get nbr_places(){
    return this.Ajouterform.get("nbr_places");
  }
}

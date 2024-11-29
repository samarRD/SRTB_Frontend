import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarqueService } from 'src/app/service/marque.service';
import { TypeService } from 'src/app/service/type.service';
import { VehiculeServiceService } from 'src/app/service/vehicule-service.service';

@Component({
  selector: 'app-modifier-vehicule',
  templateUrl: './modifier-vehicule.component.html',
  styleUrls: ['./modifier-vehicule.component.css']
})
export class ModifierVehiculeComponent {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any;
  id!: number;
  TypeData : any =[];
  TypeFilter:string="";
  TypesListWithoutFilter:any=[];
  MarqueData : any =[];
  MarqueFilter:string="";
  MarquesListWithoutFilter:any=[];
  constructor(
    public ar: ActivatedRoute,
    public vehiculeService:VehiculeServiceService,
    private router: Router,
    private typeService:TypeService,private marqueService: MarqueService
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.vehiculeService.get(this.id).subscribe((data) => {
      this.C = data;
      console.log(this.C)
      this.setForm()
    });
  }

  ngOnInit(): void {
    this.refreshMarques();
    this.refreshTypes();
  }

  setForm(){
    this.Modifierform = new FormGroup(
      {
        matricule: new FormControl(this.C?.matricule, [Validators.required]),
        datemise_enmarche: new FormControl(this.C?.datemise_enmarche, [Validators.required]),
        taux_consommation: new FormControl( this.C?.taux_consommation,[Validators.required]),
        id_type: new FormControl(null,[Validators.required]),
        id_marque: new FormControl(null,[Validators.required]),
      },
    );
    const idtypeFormControl = this.Modifierform.get('id_type');
    if (idtypeFormControl !== null) {
      idtypeFormControl.setValue(this.C?.type.id);
    }
    const idmarqueFormControl = this.Modifierform.get('id_marque');
    if (idmarqueFormControl !== null) {
      idmarqueFormControl.setValue(this.C?.marque.id);
    }
  }



refreshTypes(){
  this.typeService.getAll().subscribe((res:any) => {
    this.TypeData = res;
    this.TypesListWithoutFilter=res;

  })

}

refreshMarques(){
  this.marqueService.getAll().subscribe((res:any) => {
    this.MarqueData = res;
    this.MarquesListWithoutFilter=res;

  })

}
  get form() {
    return this.Modifierform.controls;
  }
  get matricule() {
    return this.Modifierform.get('matricule');
  }
  get datemise_enmarche() {
    return this.Modifierform.get('datemise_enmarche');
  }
  get taux_consommation() {
    return this.Modifierform.get('taux_consommation');
  }
  get id_type() {
    return this.Modifierform.get('id_type');
  }
  get id_marque() {
    return this.Modifierform.get('id_marque');
  }

  onSubmit() {
    console.log(this.Modifierform);
    if (!this.Modifierform.invalid) {

       this.C.matricule = this.matricule?.value;
        this.C.datemise_enmarche = this.datemise_enmarche?.value;
        this.C.taux_consommation = this.taux_consommation?.value;
        console.log(this.C);

        this.vehiculeService.Update(this.C,this.id_type?.value,this.id_marque?.value).subscribe((data) => {
          alert('vehicule modifiée avec succés');
          this.router.navigate(['/admin']);

        });

    }
  }



}





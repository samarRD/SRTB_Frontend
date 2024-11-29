import { LigneService } from './../../service/ligne.service';
import { ServiceService } from './../../service/service.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ArretService } from 'src/app/service/arret.service';

@Component({
  selector: 'app-modifier-service',
  templateUrl: './modifier-service.component.html',
  styleUrls: ['./modifier-service.component.css']
})
export class ModifierServiceComponent {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any;
  id!: number;

  ligneData :any =[];
  serviceData :any =[];
  ligneListWithoutFilter:any=[];
  serviceListWithoutFilter: any=[];
  ArretData: any =[];
  constructor(public ar: ActivatedRoute,public service:ServiceService,public LigneService: LigneService, private router: Router ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.service.get(this.id).subscribe((data) => {
      this.C = data;
      console.log(this.C)
      this.setForm()
    });
  }

    ngOnInit(): void {
  this.refreshLigne();
    }

  setForm(){
    this.Modifierform = new FormGroup(
      {
       libelle: new FormControl(this.C?.libelle, [Validators.required]),
       id_ligne: new FormControl(this.C?.ligne.id,[Validators.required]),
       heure_depart : new FormControl(this.C?.heure_depart, [Validators.required]),
       heure_arrive : new FormControl(this.C?.heure_arrive, [Validators.required]),
      },
    );
    /*const iddepartFormControl = this.Modifierform.get('id_arretdepart');
    if (iddepartFormControl !== null) {
      iddepartFormControl.setValue(this.C?.arretdepart.id);
    }
    const idarriveeFormControl = this.Modifierform.get('id_arretarrivee');
    if (idarriveeFormControl !== null) {
      idarriveeFormControl.setValue(this.C?.arretarrivee.id);
    }
    const idLigneFormControl = this.Modifierform.get('id_ligne');
    if (idLigneFormControl !== null) {
      idLigneFormControl.setValue(this.C?.ligne.id);
    }*/
  }
  refreshLigne(){
    this.LigneService.getAll().subscribe((res:any) => {
      this.ligneData = res;
    })

  }
  get form() {
    return this.Modifierform.controls;
  }
  get libelle(){
    return this.Modifierform.get("libelle");
  }
  get heure_depart(){
    return this.Modifierform.get("heure_depart");
  }
  get heure_arrive(){
    return this.Modifierform.get("heure_arrive");
  }
  get id_ligne(){
    return this.Modifierform.get("id_ligne");
  }

  onSubmit() {
    console.log(this.Modifierform);
    if (!this.Modifierform.invalid) {

        this.C.libelle = this.libelle?.value;
        this.C.heure_depart = this.heure_depart?.value;
        this.C.heure_arrive = this.heure_arrive?.value;
        this.C.id_ligne = this.id_ligne?.value;
        console.log(this.C);

        this.service.Update(this.C ,this.id_ligne?.value ).subscribe((data) => {
          alert('service modifiée avec succés');
          this.router.navigate(['/admin']);

        });

    }
  }



}


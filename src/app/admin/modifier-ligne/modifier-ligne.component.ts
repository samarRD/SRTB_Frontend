import { LigneService } from './../../service/ligne.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArretService } from 'src/app/service/arret.service';

@Component({
  selector: 'app-modifier-ligne',
  templateUrl: './modifier-ligne.component.html',
  styleUrls: ['./modifier-ligne.component.css']
})
export class ModifierLigneComponent {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any;
  id!: number;
  ArretData: any =[];
  constructor(public ar: ActivatedRoute,public ligneService:LigneService,public arret:ArretService,private router: Router) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.ligneService.get(this.id).subscribe((data) => {
      this.C = data;
      console.log(this.C)
      this.setForm()
    });
  }

  ngOnInit(): void {
    this.refreshArret();
      }

  setForm(){
    this.Modifierform = new FormGroup(
      {
        libelle: new FormControl(this.C?.libelle, [Validators.required]),
        kilometrage: new FormControl(this.C?.kilometrage, [Validators.required]),
        id_arretarrivee: new FormControl(this.C?.arretarrivee?.id,[Validators.required]),
        id_arretdepart: new FormControl(this.C?.arretdepart?.id,[Validators.required]),
      },
    );
  }
  refreshArret(){
    this.arret.getAll().subscribe((res:any) => {
      this.ArretData = res;
    })

  }

  onSubmit() {
    console.log(this.Modifierform);
    if (!this.Modifierform.invalid) {

       this.C.libelle = this.libelle?.value;
        this.C.kilometrage= this.kilometrage?.value;

        console.log(this.C);

        this.ligneService.Update(this.C,this.id_arretdepart?.value ,this.id_arretarrivee?.value).subscribe((data) => {
          alert('ligne modifiée avec succés');
        });

    }
  }

  get form() {
    return this.Modifierform.controls;
  }
  get libelle() {
    return this.Modifierform.get('libelle');
  }
  get kilometrage() {
    return this.Modifierform.get('kilometrage');
  }
  get id_arretdepart() {
    return this.Modifierform.get('id_arretdepart');
  }
  get id_arretarrivee() {
    return this.Modifierform.get('id_arretarrivee');
  }


}






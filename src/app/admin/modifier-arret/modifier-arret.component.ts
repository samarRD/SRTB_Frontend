import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArretService } from 'src/app/service/arret.service';

@Component({
  selector: 'app-modifier-arret',
  templateUrl: './modifier-arret.component.html',
  styleUrls: ['./modifier-arret.component.css']
})
export class ModifierArretComponent {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any;
  id!: number;
  constructor(public ar: ActivatedRoute,public arretService:ArretService,) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.arretService.get(this.id).subscribe((data) => {
      this.C = data;
      console.log(this.C)
      this.setForm()
    });
  }

  ngOnInit(): void {

  }

  setForm(){
    this.Modifierform = new FormGroup(
      {
        libelle: new FormControl(this.C?.libelle, [Validators.required]),
      },
    );
  }

  get form() {
    return this.Modifierform.controls;
  }
  get libelle() {
    return this.Modifierform.get('libelle');
  }

  onSubmit() {
    console.log(this.Modifierform);
    if (!this.Modifierform.invalid) {

       this.C.libelle = this.libelle?.value;
        console.log(this.C);

        this.arretService.Update(this.C).subscribe((data) => {
          alert('arret modifiée avec succés');
        });

    }
  }


}

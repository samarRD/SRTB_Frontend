import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarqueService } from 'src/app/service/marque.service';

@Component({
  selector: 'app-modifier-marque',
  templateUrl: './modifier-marque.component.html',
  styleUrls: ['./modifier-marque.component.css']
})
export class ModifierMarqueComponent {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any; // utilisée pour stocker les données de la marque à modifier.
  id!: number;
  constructor(public ar: ActivatedRoute,public marqueService:MarqueService,) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.marqueService.get(this.id).subscribe((data) => {
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

        this.marqueService.Update(this.C).subscribe((data) => {
          alert('marque modifiée avec succés');

        });

    }
  }


}

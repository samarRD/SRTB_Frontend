import { TypeService } from './../../service/type.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-type',
  templateUrl: './modifier-type.component.html',
  styleUrls: ['./modifier-type.component.css']
})
export class ModifierTypeComponent {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any;
  id!: number;
  constructor(
    public ar: ActivatedRoute,
    public typeService:TypeService,
    private router: Router
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.typeService.get(this.id).subscribe((data) => {
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
        nbr_places : new FormControl(this.C?.nbr_places, [Validators.required]),
      },
    );
  }

  get form() {
    return this.Modifierform.controls;
  }
  get libelle() {
    return this.Modifierform.get('libelle');
  }

  get nbr_places() {
    return this.Modifierform.get('nbr_places');
  }
  onSubmit() {
    console.log(this.Modifierform);
    if (!this.Modifierform.invalid) {

       this.C.libelle = this.libelle?.value;
       this.C.nbr_places = this.nbr_places?.value;
        console.log(this.C);

        this.typeService.Update(this.C).subscribe((data) => {
          alert('type modifiée avec succés');
          window.history.go(-1);
        });

    }
  }



}







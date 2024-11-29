import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.css']
})
export class ModifierUserComponent implements OnInit {
  Modifierform!: FormGroup;
  isSubmitted: boolean = false;
  C!: any;
  id!: number;

  constructor(
    public ar: ActivatedRoute,
    public userService: UserService,
    private router: Router
  ) {
    this.ar.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.userService.get(this.id).subscribe((data) => {
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
        username: new FormControl({value : this.C?.username,disabled : true}),
        role: new FormControl(this.C?.role, [Validators.required]),
        email: new FormControl({value : this.C?.email,disabled : true}),
      },
    );
  }

  get form() {
    return this.Modifierform.controls;
  }
  get email() {
    return this.Modifierform.get('email');
  }
  get username() {
    return this.Modifierform.get('username');
  }
  get role() {
    return this.Modifierform.get('role');
  }

  onSubmit() {
    console.log(this.Modifierform);
    if (!this.Modifierform.invalid) {

       this.C.username = this.username?.value;
        this.C.role = this.role?.value;
        this.C.email = this.email?.value;
        console.log(this.C);

        this.userService.UpdateUser(this.C).subscribe((data) => {
          alert('User Updated Successfully');
          this.router.navigate(['/admin']);
        });

    }
  }



}


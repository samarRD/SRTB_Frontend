import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  Modifier!: FormGroup;
  isSubmitted: boolean = false;
  userData : any ={};
  constructor(private UserService : UserService) {
  }
  ngOnInit(): void {
    this.refreshProfile()
  }

  setForm(){
    this.Modifier = new FormGroup(
      {
        username: new FormControl(this.userData?.username),
        email:new FormControl(this.userData?.email,[Validators.required,Validators.email]),
        password: new FormControl('', [Validators.required, this.passwordLengthValidator]) ,
        password_confirmation:new FormControl('',Validators.required),
      },
      {
        validators: ProfilComponent.passwordMatch('password','password_confirmation'),
      }
    );
  }
  refreshProfile(){
    const id= this.UserService.getToken();
    this.UserService.get(id).subscribe((data: any)=>{
      this.userData = data;
      this.setForm();
    });
  }
  static passwordMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (
        confirmPasswordControl.errors &&!confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMatch: true });
        return { passwordMatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }


  passwordLengthValidator(control: FormControl): ValidationErrors | null {
    const value = control.value as string;
    if (value.length>0  && value.length < 8 ) {
      return { 'passwordLength': true };
    }
    return null;
  }
  onSubmit() {
    console.log(this.Modifier);
    if (!this.Modifier.invalid) {
        this.userData.username = this.username?.value;
        this.userData.email = this.email?.value;
        this.userData.password = this.password?.value;
        console.log(this.userData);
        this.UserService.Update(this.userData).subscribe((data) => {
          alert('vous avez modifier votre informations');
        });
      }
    else{
      alert("entrer des informations valides")
    }
  }

  get email() {
    return this.Modifier.get('email');
  }
  get username() {
    return this.Modifier.get('username');
  }

  get password() {
    return this.Modifier.get('password');
  }

}

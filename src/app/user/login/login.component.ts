import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authentification!:FormGroup;
  isSubmitted:boolean=false;
  errorMessage: string='';
  constructor(private userService : UserService,private route : Router) { }

  ngOnInit(): void {
    this.authentification= new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,this.passwordLengthValidator]),
   },
       )}
  passwordLengthValidator(control: FormControl): ValidationErrors | null {
    const value = control.value as string; //Cette ligne extrait la valeur du champ "password" à partir du contrôle de formulaire control.
      if (value.length > 0 && value.length < 8  ) {
        return { 'passwordLength': true };
          }
        return null;
          }

  get email(){
    return this.authentification.get("email")
    }
  get password(){
    return this.authentification.get("password")
    }

    // login form submit
    onSubmit(){
      const LoginInfo = {
      'email' : this.email?.value,
      'password' : this.password?.value
    };
      this.isSubmitted=true;
      if (!this.authentification.invalid) {
        //Send request
        this.userService.login(LoginInfo)
        .subscribe({
          next: (data :any) =>{
          if(data !== null){
            if(data.status == true ){
              this.userService.saveToken(data.id,data.role,data.email,data.token);
              this.route.navigate(['/home']);
            }
            else {
              alert("vous n'ete pas accepté d'aprés l'admin");
                 }
          }
              else{
              alert("Votre email ou mot de passe est incorrecte.");
              }
          },
          error: (err : Error) => {
            this.errorMessage = err.message;
            console.log(err)
          }
        });
      }
      else{
        console.log("Entrer des informations valides !!!", '❌');

      }
    }

  }

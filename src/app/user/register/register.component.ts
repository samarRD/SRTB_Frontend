import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Inscriptionform!:FormGroup;
  isSubmitted:boolean=false;
  constructor(private router: Router,private userService: UserService){}


  ngOnInit(): void {
    this.Inscriptionform= new FormGroup({
      UserName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z ]*")]), //une validation de motif qui n'accepte que des lettres et des espaces
      role:new FormControl ('Responsable RH', [Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',  [Validators.required, this.passwordLengthValidator]),
      password_confirmation:new FormControl('',Validators.required),
    },
      this.passwordMatch('password','password_confirmation') //Cette ligne définit la validation personnalisée entre les champs "password" et "password_confirmation"
       )
      }

   passwordLengthValidator(control: FormControl): ValidationErrors | null {
    const value = control.value as string; //Cette ligne extrait la valeur du champ "password" à partir du contrôle de formulaire control.
      if (value.length > 0 && value.length < 8  ) {
        return { 'passwordLength': true };
        }
        return null;
      }

     passwordMatch(password: string, confirmPassword: string) {//renvoie une fonction qui agit en tant que validateur.
      return (formGroup: AbstractControl): ValidationErrors | null => {//Cette ligne déclare une fonction anonyme qui prend le formGroup (groupe de contrôles de formulaire) en tant que paramètre et renvoie un objet ValidationErrors si la validation échoue, sinon elle renvoie null.
       const passwordControl = formGroup.get(password);
       const confirmPasswordControl = formGroup.get(confirmPassword);
          if (!passwordControl || !confirmPasswordControl) {//vérifie si les contrôles des champs de mot de passe et de confirmation existent. Si l'un ou l'autre est manquant, la méthode renvoie null, indiquant que la validation est réussie.
            return null;
          }
          if (confirmPasswordControl.errors && !confirmPasswordControl.errors["passwordMismatch"]) {//vérifie si le champ de confirmation du mot de passe a déjà des erreurs, mais pas spécifiquement l'erreur "passwordMismatch". Si tel est le cas, la méthode renvoie null, indiquant que la validation est réussie.
            return null;
          }
          if (passwordControl.value !== confirmPasswordControl.value) {//compare les valeurs des champs de mot de passe et de confirmation. Si elles ne correspondent pas, l'erreur "passwordMatch" est ajoutée au champ de confirmation et un objet ValidationErrors avec la clé "passwordMatch" est renvoyé pour indiquer que la validation a échoué.
            confirmPasswordControl.setErrors({ passwordMatch: true });
            return { passwordMatch: true };
          } else {
            confirmPasswordControl.setErrors(null);//Si les valeurs des champs de mot de passe et de confirmation correspondent, les erreurs du champ de confirmation sont effacées et null est renvoyé, indiquant que la validation est réussie.
            return null;
          }
        };
      }

      // Create the user
    onSubmit(){
      this.isSubmitted = true;
      if(!this.Inscriptionform.invalid){
          const user ={
            "username" : this.nom?.value,
            "email"     : this.email?.value,
            "role"     : this.role?.value,
            "password"  : this.password?.value,
          }
          this.userService.register(user).subscribe({//La méthode subscribe est utilisée pour s'abonner à l'observable retourné par la méthode register et gérer les résultats de la requête.
            next: (data :any) =>{//Elle reçoit les données renvoyées par le serveur en réponse.
              alert("inscription avec succès");
              this.router.navigate(['/authentification']);
            },
            error: (erreur : any) => {//Elle reçoit l'objet d'erreur renvoyé par le serveur et affiche son message dans la console.
              console.log(erreur.message)
            }
          })
      }else{
        alert("Entrer des informations valides !!!");
      }
    }


      // get bindings variables from the form
    get email(){
      return this.Inscriptionform.get("email");
        }
    get nom(){
      return this.Inscriptionform.get("UserName");
        }
    get role(){
      return this.Inscriptionform.get("role");
        }
    get password(){
      return this.Inscriptionform.get("password");
        }
    }























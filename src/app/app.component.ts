import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pfe_Frontend';

  constructor(private router:Router ,private UserService : UserService) { }
  signout(){
    this.UserService.signOut();
    window.location.reload();
  }


  role(){
    let role = this.UserService.getRole() as string;
    if(role == "Responsable RH"){
      return "Responsable RH";
    }else if(role == "Admin"){
      return "Admin";
    }
    else if(role == "Responsable énergétique"){
      return "Responsable énergétique";
    }
    else if(role == "Agent de planification"){
      return "Agent de planification";
    }
    else if(role == "Responsable recette"){
      return "Responsable recette";
    }
    else if(role == "Responsable technique"){
    return "Responsable technique" ;
    }
    else return "Chauffeur";
  }


isUserAuthenticated() {
    const token: string = this.UserService.getToken() as string;
    if (token != null) {
      return true;
    }
    else {
      return false;
    }
  }

    UserAuthenticated() {
      const Email: string = this.UserService.getEmail() as string;
      if (Email != null) {
        return Email;
      } else {
        return "Email";
      }
    }
}


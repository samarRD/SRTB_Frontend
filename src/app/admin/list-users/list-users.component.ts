import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  userData : any =[];
  UserNameFilter:string="";
  UserListWithoutFilter:any=[];
  public buttonStatus: boolean[] = [];

  constructor(private UserService : UserService) {

  }
  isButtonHidden(userId: number): boolean {
    const hiddenButtons = localStorage.getItem('hiddenButtons') || '';
    return Boolean(hiddenButtons.split(',').includes(String(userId)));//divise la chaîne hiddenButtons en un tableau en utilisant la virgule comme séparateur

  }

  hideButton(userId: number): void {
    let hiddenButtons = localStorage.getItem('hiddenButtons');
    if (hiddenButtons) {
      hiddenButtons += ',' + userId;
    } else {
      hiddenButtons = String(userId);
    }
    localStorage.setItem('hiddenButtons', hiddenButtons);//enregistre la valeur de hiddenButtons dans le stockage local du navigateur avec la clé 'hiddenButtons'.
  }

  ngOnInit(): void {
    this.refreshUsers()
  }
  refreshUsers(){
    this.UserService.getAll().subscribe((res:any) => {
      this.userData = res;
      this.UserListWithoutFilter=res;

    })

  }
  //confiramtion du compte
  delete(id : number){
   if(confirm("Are you sure to delete this user?")){
     this.UserService.Delete(id).subscribe(res => {
       this.refreshUsers();
     })
   }
  }

  accepter(user : any){
    user.status = true;
    this.UserService.UpdateUser(user).subscribe((data) => {
      alert('utilisateur accepté avec succés');
      window.location.reload();
    });
  }
  refuser(user : any){
    user.status = false;
    this.UserService.UpdateUser(user).subscribe((data) => {
      alert('utilisateur refusé avec succés');
      window.location.reload();});
  }
  Rstatus(status:any){
    if(status){
      return "Accepté"
    }
    else {
      return "Refusé"
    }

  }


  FilterFn(){
    var UserNameFilter = this.UserNameFilter; // le nom saisi par l'admin
    this.userData = this.UserListWithoutFilter.filter(function(user:any){ //affecte à this.userData une nouvelle liste d'utilisateurs filtrée.
      return user.username.toString().toLowerCase().includes( //utilise la méthode filter() pour parcourir chaque élément (user) de la liste this.UserListWithoutFilter et renvoie true si le nom d'utilisateur (user.username) contient le filtre spécifié (UserNameFilter). La comparaison est effectuée en convertissant les deux chaînes en minuscules et en supprimant les espaces inutiles avec toString().toLowerCase().trim().
        UserNameFilter.toString().trim().toLowerCase()
      )
    });

  }

}





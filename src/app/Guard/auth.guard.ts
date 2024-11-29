import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: UserService, public router: Router) {}
  //La méthode canActivate est implémentée pour effectuer les vérifications nécessaires avant de permettre à l'utilisateur d'accéder à la route.
  //next  Cet objet contient des informations sur la route à laquelle l'utilisateur tente d'accéder.
  //state Cet objet représente l'état actuel du Router et contient des informations sur l'état de la navigation
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const role = this.authService.getRole();
    /*next.data['role']: Cela fait référence à la propriété role définie dans les données personnalisées de la route à laquelle l'utilisateur tente d'accéder.
    Cette propriété peut être utilisée pour restreindre l'accès à certaines routes en fonction du rôle de l'utilisateur.*/

    /*next.data['role'].indexOf(role): Cela vérifie si le rôle de l'utilisateur actuel est présent dans
    le tableau des rôles autorisés définis pour la route. La méthode indexOf renvoie
    l'index de la première occurrence du rôle dans le tableau. Si le rôle
     n'est pas trouvé, -1 est renvoyé. */

      if(next.data['role'] && next.data['role'].indexOf(role) === -1) {
        this.router.navigate(['/home']);
        alert("Accès refusé aux Roles non-propriétaires !");
        return false;
      }
      //check user is logged in or not
    if(this.authService.getJwt() === null) {
      alert("Accès refusé !");
      this.router.navigate(['/authentification'],
       { queryParams: { returnUrl: state.url } })
       /* utilisé pour ajouter le paramètre returnUrl qui contient l'URL de la route
       à laquelle l'utilisateur tente d'accéder. Cela est utile pour rediriger l'utilisateur
       vers la route initiale après une authentification réussie. */
    }

    return true;
  }

}


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerpageGuard implements CanActivate {
  constructor(public tokenStorageService: UserService, public router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      //check user is logged in or not
    if(this.tokenStorageService.getJwt() !== null) {
      alert("Accès refusé, vous êtes déjà connecté !");
      this.router.navigate(['/home']);
    }
    return true;
    }

}

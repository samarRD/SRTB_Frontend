 import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const  APIUrlUser ="http://localhost:8080/api/users";
const ID_KEY = 'auth-id';
const ROLE_KEY ="auth-role";
const EMAIL_KEY ="auth-email";
const TOKEN_KEY ="auth-token";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient){  }

  register(user : any): Observable<any> {
    return this.http.post(APIUrlUser+'/register',user);
  }
  login(data :{email : string,password : string}): Observable<any>{
    return this.http.post(APIUrlUser+'/login', data)
  }

  get(id: any): Observable<any> {
    return this.http.get(`${APIUrlUser}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get<any[]>(APIUrlUser);
  }
  Update(data :any): Observable<any> {
    return this.http.put(APIUrlUser,data);
  }
  UpdateUser(data :any): Observable<any> {
    return this.http.put(APIUrlUser +'/update',data);
  }
  Delete(id: any): Observable<any> {
    return this.http.delete(APIUrlUser +'/' +id);
  }
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(id :string,role : string,email : string,token :string): void {
    window.sessionStorage.setItem(ID_KEY, id);
    window.sessionStorage.setItem(ROLE_KEY, role);
    window.sessionStorage.setItem(EMAIL_KEY, email);
    window.sessionStorage.setItem(TOKEN_KEY ,token);
  }

// get the user from session stoage
public getToken(): string | null {
  return window.sessionStorage.getItem(ID_KEY) !== null ? window.sessionStorage.getItem(ID_KEY) : null  ;
}
public getRole(): string | null {
  return window.sessionStorage.getItem(ROLE_KEY) !== null ? window.sessionStorage.getItem(ROLE_KEY) : null  ;
}
public getEmail(): string | null {
  return window.sessionStorage.getItem(EMAIL_KEY) !== null ? window.sessionStorage.getItem(EMAIL_KEY) : null  ;
}
public getJwt(): string | null {
  return window.sessionStorage.getItem(TOKEN_KEY) !== null ? window.sessionStorage.getItem(TOKEN_KEY) : null  ;
}
}

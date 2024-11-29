import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8080/api/lignes";
@Injectable({
  providedIn: 'root'
})
export class LigneService {

  constructor(private http:HttpClient){  }
  create(ligne : any,id_arretdepart:any,id_arretarrive:any): Observable<any> {
    return this.http.post(`${APIUrl}/${id_arretdepart}/${id_arretarrive}`,ligne);
  }

  Update(ligne : any,id_arretdepart:any,id_arretarrive:any): Observable<any> {

    return this.http.put(`${APIUrl}/${id_arretdepart}/${id_arretarrive}`,ligne);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${APIUrl}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get<any[]>(APIUrl);
  }

  Delete(id: any): Observable<any> {
    return this.http.delete(APIUrl +'/' +id);
  }

}



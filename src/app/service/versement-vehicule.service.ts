import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8080/api/versements";
@Injectable({
  providedIn: 'root'
})
export class VersementVehiculeService {

  constructor(private http:HttpClient) { }
  create(versement : any,id_vehicule:any): Observable<any> {
    return this.http.post(APIUrl+'/' +id_vehicule,versement);
  }
  getAll(): Observable<any> {
    return this.http.get<any[]>(APIUrl);
  }
  Delete(id: any): Observable<any> {
    return this.http.delete(APIUrl +'/' +id);
  }

}

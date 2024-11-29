import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const  APIUrl ="http://localhost:8080/api/rapports2";
@Injectable({
  providedIn: 'root'
})
export class Rapport2Service {

  constructor(private http:HttpClient) { }
  // methode pour recuperer toutes les rapports d'un chauffeur par son id
  get(id: any): Observable<any> {
    return this.http.get(`${APIUrl}/${id}`);
  }
  // methode pour recuperer un rapport d'un chauffeur par jour
  getPerfDay(id: any, day : any): Observable<any> {
    return this.http.get<any[]>(APIUrl+"/"+id+"/"+day);
  }
  getPerfDay2(id: any, day1 : any, day2 : any): Observable<any> {
    return this.http.get<any[]>(APIUrl+"/"+id+"/"+day1 +"/"+day2);
  }
  }

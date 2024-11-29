import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8070/api/services";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient){  }

  create(service: any,id_ligne:any): Observable<any> {
    return this.http.post(`${APIUrl}/${id_ligne}`,service);
  }

  Update(service: any,id_ligne:any): Observable<any> {
    return this.http.put(`${APIUrl}/${id_ligne}`,service);
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

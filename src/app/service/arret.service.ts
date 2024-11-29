import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8080/api/arrets";
@Injectable({
  providedIn: 'root'
})
export class ArretService {

  constructor(private http:HttpClient){  }
  create(arret : any): Observable<any> {
    return this.http.post(APIUrl,arret);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${APIUrl}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get<any[]>(APIUrl);
  }
  Update(data :any): Observable<any> {

    return this.http.put(APIUrl,data);
  }
  Delete(id: any): Observable<any> {
    return this.http.delete(APIUrl +'/' +id);
  }

}

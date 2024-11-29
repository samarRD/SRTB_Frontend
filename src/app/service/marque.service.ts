import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8080/api/marques";
@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private http:HttpClient) { }
  create(marque : any): Observable<any> {
    return this.http.post(APIUrl,marque);
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

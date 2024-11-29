import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8080/api/types";
@Injectable({
  providedIn: 'root'
})

export class TypeService {

  constructor(private http:HttpClient) { }

  create(type : any): Observable<any> {
    return this.http.post(APIUrl,type);
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

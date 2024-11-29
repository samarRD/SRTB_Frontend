import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const  APIUrl ="http://localhost:8080/api/vehicules";
@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {
  private APIUrl1 ="http://localhost:8080/api/vehicules/addTypeMarque";
private APIUrl2 ="http://localhost:8080/api/vehicules/updateTypeMarque";
  constructor(private http:HttpClient){  }
  create(vehicule : any, id_type :any , id_marque : any): Observable<any> {
    return this.http.post(this.APIUrl1 + '/' + id_type + '/' + id_marque,vehicule);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${APIUrl}/${id}`);
  }
  getAll(): Observable<any> {
    return this.http.get<any[]>(APIUrl);
  }
  Update(vehicule : any, id_type :any , id_marque : any): Observable<any> {
    return this.http.put(this.APIUrl2 + '/' + id_type + '/' + id_marque,vehicule);
  }

  Delete(id: any): Observable<any> {
    return this.http.delete(APIUrl +'/' +id);
  }
  UpdateV(vehicule:any):Observable<any>{
    return this.http.put(APIUrl,vehicule);
  }
}

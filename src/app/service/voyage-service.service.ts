import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  APIUrl ="http://localhost:8080/api/voyages";
@Injectable({
  providedIn: 'root'
})

export class VoyageServiceService {
  private APIUrl ="http://localhost:8080/api/voyages";
  private APIUrl1 ="http://localhost:8080/api/voyages/addV";
  private APIUrl2 ="http://localhost:8080/api/voyages/UpdateV";

    constructor(private http:HttpClient){  }
    create(voyage : any , id_user : any , id_service : any , id_vehicule :any): Observable<any> {
      return this.http.post(this.APIUrl1 + '/' + id_user + '/' + id_service + '/' +id_vehicule, voyage);
    }
   update(voyage:any,userrealise_id:any ,vehiculerealise_id : any):Observable<any>{
    return this.http.put(this.APIUrl2 + '/' + userrealise_id + '/' + vehiculerealise_id , voyage);
   }
   updateV(voyage:any):Observable<any>{
    return this.http.put(this.APIUrl , voyage);
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

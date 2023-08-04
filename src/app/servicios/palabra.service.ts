import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  url=`${environment.backendUrl}/palabra`;
  constructor(private http:HttpClient, private router:Router){}

  getPalabraAbecedario():Observable<any>{
    return this.http.get(this.url);
  }

  getPalabraId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postPalabra(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putPalabra(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body)
  }


}

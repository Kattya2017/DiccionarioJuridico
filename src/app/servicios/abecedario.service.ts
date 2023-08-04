import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbecedarioService {

  url=`${environment.backendUrl}/abecedario`
  constructor(private http:HttpClient, private router:Router){}

  getAbecedario(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }

  getAbecedarioId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postAbecedario(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putAbecedario(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteAbecedario(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}

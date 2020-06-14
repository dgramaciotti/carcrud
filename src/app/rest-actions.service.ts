import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RestActionsService {
  readonly url = 'http://localhost:3000/api/carros';
  constructor(private http: HttpClient) { }
  create(carro){
    return this.http.post(this.url,carro);
  }
  read(){
    return this.http.get(this.url);
  }
  update(carro){
    return this.http.put(this.url,carro);
  }
  delete(id){
    return this.http.delete(this.url+id);
  }
}

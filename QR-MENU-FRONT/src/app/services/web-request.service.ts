import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = environment.URI;
  }

  get(uri: string) { 
    return this.http.get(`${this.ROOT_URL}/${uri}`, { withCredentials: true});
  }

  post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`,  payload, { withCredentials: true});
  }

  patch(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload,  { withCredentials: true});
  }

  delete(uri: string, payload: Object){
    return this.http.delete(`${this.ROOT_URL}/${uri}`, payload);
  }

}
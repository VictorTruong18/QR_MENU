import { Injectable } from '@angular/core';
import { WebRequestService } from "../web-request.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor(private WebRequestService : WebRequestService) { }

    //HEADER AUTHORISATION
    getHeader(){
      return this.WebRequestService.get('authorisation/header');
    }

    //DISCONNECTION
    logout(){
      return this.WebRequestService.get('authorisation/logout');
    }

  
}

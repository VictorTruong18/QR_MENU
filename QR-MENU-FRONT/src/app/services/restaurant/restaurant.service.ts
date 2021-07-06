import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  
  constructor(private WebRequestService : WebRequestService) {}



  restaurantRegister(val : Object){
    return this.WebRequestService.post('restaurant', {val});
  }

  restaurantGet(){
    return this.WebRequestService.get('restaurant')
  }

  restaurantGetId(id : string){
    return this.WebRequestService.get(`restaurant/${id}`)
  }


}

import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private WebRequestService : WebRequestService) { }

  addDish(val : Object) {
    return this.WebRequestService.post('dish', {val} )
  }
}

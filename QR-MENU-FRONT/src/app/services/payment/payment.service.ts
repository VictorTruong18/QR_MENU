import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private WebRequestService : WebRequestService) { }

  getCheckout(){
    return this.WebRequestService.get('payment/checkout');
  }
}

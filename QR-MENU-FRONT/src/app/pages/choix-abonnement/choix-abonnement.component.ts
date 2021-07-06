import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-choix-abonnement',
  templateUrl: './choix-abonnement.component.html',
  styleUrls: ['./choix-abonnement.component.css']
})
export class ChoixAbonnementComponent implements OnInit {

  prix = environment.STRIPE_prix;

  constructor(private ToastrService : ToastrService) { }

  ngOnInit(): void {
    this.ToastrService.success('Your email has been confirmed', 'Success');
  }

  payer(){
    const stripe   = Stripe(environment.STRIPE_publishableKey);
    const elements = stripe.elements();
    fetch(`${environment.URI}/payment/create-checkout-session`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"stripe_price" : this.prix})
  })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }
}

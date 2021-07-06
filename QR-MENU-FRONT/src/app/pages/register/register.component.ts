import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service'; 
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

declare var $ : any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    //Le CAPTCHA
  //La clee Public du Captcha
  CAPTCHA_publicKey = environment.CAPTCHA_publicKey
  //Le token en retour du Captcha
  private captchaResponse : string;
  //Resolution du Captcha
  private captcha : boolean;
  
  constructor(private RestaurantService : RestaurantService,
    private router: Router,
    private ToastrService: ToastrService)
     { 
    //Initialisation des attributs de classe
    this.captcha = false;
    this.captchaResponse = '';
    

  }

  ngOnInit(): void {
    $(document).ready(function() {
      $(".erreur").hide();
    })
  }

  getRestaurantInfo(value : string){
    if(this.verificationChamps(value)){

      var myJSON = JSON.stringify(value);
      var inscriptionData = JSON.parse(myJSON);


      
      
      let restaurant = {
        captchaToken: this.captchaResponse,
        restaurantName: inscriptionData['Restaurant_name'],
        email: inscriptionData['email'],
        password: inscriptionData['password'],
        phone: inscriptionData['phone'],
        address: inscriptionData['address'],
        city: inscriptionData['city'],
        country: inscriptionData['country'],
        zip : inscriptionData['zip'],
        website : inscriptionData['website'],
        description : inscriptionData['description']
      }

      console.log(restaurant)
      var myJSON = JSON.stringify(restaurant);
      var restaurantJSON = JSON.parse(myJSON);


      this.RestaurantService.restaurantRegister(restaurantJSON).subscribe(
        (response) => {
          console.log("success")
          this.ToastrService.success('Your account has been registered', 'Success');
          this.router.navigate(['/confirmationEmail'])
        },
        (error) => {
          this.ToastrService.error('There was an issue with registering', 'Error');
        }
      )


    }
  }


  verificationChamps(val: string){
    //STEP 0
    let champsVerification : boolean[] = [];

    champsVerification.push(
      this.verificationChampNom(val),
      this.verificationConfirmationRegex(val),
      this.verificationValiditeEmail(val),
      this.verificationValiditeCaptcha(),
    );

    let isEveryChampValid = champsVerification.every(function(champ){
      return champ == true
    })


    return isEveryChampValid;

  }


  verificationConfirmationRegex(val: string){
    var myJSON = JSON.stringify(val);
    var inscriptionData = JSON.parse(myJSON);
    var password = inscriptionData["password"];
    var checkRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*'"])(?=.*[a-zA-Z])(?=.{10,})/;
    if (checkRegExp.test(password) == true ){
      $(document).ready(function(){
        $("#erreur-regex").hide();
      });
      return true;
    } else {
      $(document).ready(function(){
        $("#erreur-regex").show();
      });
      return false;
    }
  }

  verificationChampNom(val: string){
    var myJSON = JSON.stringify(val);
    var inscriptionData = JSON.parse(myJSON);
    var nom = inscriptionData["Restaurant_name"];
  
    if(nom !== ""){
      $(document).ready(function(){
        $("#erreur-nom").hide();
      });
      return true
    }else {
      $(document).ready(function(){
        $("#erreur-nom").show();
      });
      return false
    }

  }

  verificationValiditeEmail(val: string){
    var myJSON = JSON.stringify(val);
    var inscriptionData = JSON.parse(myJSON);
    var email = inscriptionData["email"];
    var checkRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (checkRegExp.test(email) == true ){
      $(document).ready(function(){
        $("#erreur-email").hide();
      });
      return true;
    } else {
      $(document).ready(function(){
        $("#erreur-email").show();
      });
      return false;
    }
  }

  verificationValiditeCaptcha(){
    if(this.captcha){
      $(document).ready(function(){
        $("#erreur-captcha").hide();
      });
    }
    else{
      $(document).ready(function(){
        $("#erreur-captcha").show();
      });
    }
    return this.captcha;
  }



  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    this.captcha = true;
  }

 
}

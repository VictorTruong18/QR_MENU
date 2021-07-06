import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service'; 
import { DishService } from 'src/app/services/dish/dish.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //RESTAURANT NAME
  restaurant_name : string;
  address : string;
  city : string;
  zip : string;
  website : string;
  link : string;
  phone : string;

  dishes = [
    {

      dishName: 'Tequila',
      dishPrice: 2.56,
      dishType: 'Drink',
    },

    {

      dishName: 'Couscous',
      dishPrice: 5.56,
      dishType: 'Dish',
    },
   
  ];

  //QR CODE
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';

  constructor(private RestaurantService : RestaurantService, private DishService : DishService) { 
    this.restaurant_name = 'My Restaurant';
    this.address = "My adress";
    this.city = "My CIty";
    this.zip = "My ZIP";
    this.phone = "My Phone"
    this.website = "My Personal Website";
    this.link = "http://localhost:5000"

  }

  

  ngOnInit(): void {

    $(document).ready(function() {
      $(".erreur").hide();
    })

    this.RestaurantService.restaurantGet().subscribe(
      (response) => {
        console.log(response)
        var myJSON = JSON.stringify(response);
        var restaurantData = JSON.parse(myJSON);

        this.restaurant_name = restaurantData['restaurantName'],
        this.address = restaurantData['address'],
        this.phone = restaurantData['phone'],
        this.city  = restaurantData['city'],
        this.zip = restaurantData['zip'],
        this.website = restaurantData['website'],
        this.link = environment.URI_FRONT + "/restaurant/" + restaurantData['_id'],
        this.value = environment.URI_FRONT + "/restaurant/" + restaurantData['_id'],
        this.dishes = restaurantData['dishes']
      },
      (error) => {
        console.log(error.error.msg)
      }
    )
  }

  addDish(val : any){
    if(this.verificationChamps(val)){
      this.dishes.push(val)
    }
  }

  verificationChamps(val: string){
    let champsVerification : boolean[] = [];

    champsVerification.push(
      this.verificationDishName(val),
      this.verificationDishPrice(val),
      this.verificationDishType(val),
    );

    let isEveryChampValid = champsVerification.every(function(champ){
      return champ == true
    })

    return isEveryChampValid;

  }

  verificationDishName(val: string){
    var myJSON = JSON.stringify(val);
    var dishData = JSON.parse(myJSON);
    var dishName = dishData["dishName"];
  
    if(dishName !== ""){
      $(document).ready(function(){
        $("#erreur-dishName").hide();
      });
      return true
    }else {
      $(document).ready(function(){
        $("#erreur-dishName").show();
      });
      return false
    }
  }

  verificationDishPrice(val: string){
    var myJSON = JSON.stringify(val);
    var dishData = JSON.parse(myJSON);
    var dishName = dishData["dishPrice"];
  
    if(dishName !== ""){
      $(document).ready(function(){
        $("#erreur-dishPrice").hide();
      });
      return true
    }else {
      $(document).ready(function(){
        $("#erreur-dishPrice").show();
      });
      return false
    }
  }

  verificationDishType(val: string){
    var myJSON = JSON.stringify(val);
    var dishData = JSON.parse(myJSON);
    var dishName = dishData["dishType"];
  
    if(dishName !== ""){
      $(document).ready(function(){
        $("#erreur-dishType").hide();
      });
      return true
    }else {
      $(document).ready(function(){
        $("#erreur-dishType").show();
      });
      return false
    }
  }

  deleteDish(dish : any){
    this.dishes = this.dishes.filter( d => d.dishName !== dish.dishName)
  } 

  registerChange(){
   
    this.DishService.addDish(this.dishes).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service'; 


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurantId : any
  //RESTAURANT NAME
  restaurant_name : string;
  address : string;
  city : string;
  zip : string;
  website : string;
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

  constructor(private route: ActivatedRoute, private RestaurantService : RestaurantService) { 
    this.restaurantId = '';
    this.restaurant_name = 'My Restaurant';
    this.address = "My adress";
    this.city = "My CIty";
    this.zip = "My ZIP";
    this.phone = "My Phone"
    this.website = "My Personal Website";
  
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("id")
    this.RestaurantService.restaurantGetId(this.restaurantId).subscribe(
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
        this.dishes = restaurantData['dishes']
      },
      (error) => {
        console.log(error.error.msg)
      }
    )
  }



}

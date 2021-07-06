const mongoose = require('mongoose');



const DishSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    dishPrice: {
      type: Number,
      required: true
    },
    dishType: {
      type: String,
      required: true,
      enum: {
          values: ['Dessert', 'Dish', 'Drink', 'Entree'],
          message: 'Dish is either: Dessert, Dish, Drink'
        }
    }
     
  
  })

const RestaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isConfirmed: {
        type: Boolean,
        defaultValue: false,
        required: true
    },
    abonnement: {
        type: String,
        defaultValue: "STANDARD",
        required:true
    },
    salt: {
        type: String,
        required: true
    },
    stripe_cus_id: {
        type: String,
        required: true
    },
    dishes: [DishSchema] 
   

})





const Restaurant = mongoose.model('Restaurant', RestaurantSchema );
module.exports = { Restaurant }
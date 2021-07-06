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





const Dish = mongoose.model('Dish', DishSchema );
module.exports = { Dish }
const express = require('express');
const router = express.Router();
const { Restaurant } = require('../db/models')
const { Dish } = require('../db/models')
const { mongoose } = require('../db/mongoose')

router.post('/', async (req,res) => {
    const dishes  = req.body.val
    const { userId } = req.session
    const _id = mongoose.Types.ObjectId(userId)
    
    await Restaurant.findByIdAndUpdate({_id},{ $set: {"dishes": []}});
    console.log(dishes)
    for(var i = 0; i < dishes.length; i++) {
        var obj = dishes[i];
        let newDish = new Dish({
            "dishName" : obj.dishName,
            "dishPrice" : obj.dishPrice,
            "dishType" : obj.dishType,
        })
        await Restaurant.findByIdAndUpdate({_id},{ $push: {"dishes": newDish}});
    }

    // await Restaurant.findByIdAndUpdate({userId},{"dishes": dishes});
    const Utilisateur = await Restaurant.findById(userId)
    
    console.log(Utilisateur.dishes)
})


module.exports = router;
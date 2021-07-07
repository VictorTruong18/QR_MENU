const express = require('express');
const router = express.Router();
const { Restaurant } = require('../db/models')
const { Dish } = require('../db/models')
const { mongoose } = require('../db/mongoose')


router.post('/', async (req,res) => {
    try {
        const dishes  = req.body.val
    const { userId } = req.session
    const _id = mongoose.Types.ObjectId(userId[0])
   

   
    await Restaurant.findByIdAndUpdate({ _id },{ $set: {"dishes": []}});
    
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
    const Utilisateur = await Restaurant.findById(_id)
    res.status(200).send()
    console.log(Utilisateur.dishes)
    } catch(err){
        console.log(err)
        res.status(400).send()
    }
    
})


module.exports = router;
const express = require('express');
const router = express.Router();
const { Restaurant } = require('../db/models')

router.post('/create-checkout-session', async (req,res) => {
   
        const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`)
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.URI}/payment/payment-success/{CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://example.com/cancel',
            payment_method_types: ['card'],
            // client_reference_id: `${sessionId}`,
            line_items : [
                { price : 'price_1J9YuzDBVMyYt29bKHh0Z9rc', quantity : 1},
            ],
            mode: 'payment'
        });
        res.json({
            id: session.id,
        })  
})

router.get('/payment-success/:session_id', async (req,res) => {
  
    const { userId } = req.session;
    const { session_id } = req.params;
    const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`)
    const session = await stripe.checkout.sessions.retrieve(
        `${session_id}`
    );
 
    //if(user._id === session.client_reference_id){
        await Restaurant.findByIdAndUpdate(userId, {abonnement:'PREMIUM'})
        await Restaurant.findByIdAndUpdate(userId,{stripe_cus_id: `${session.customer}`})
    //}

   
    res.redirect(`${process.env.URI_FRONT}/dashboard`);

})




module.exports = router;
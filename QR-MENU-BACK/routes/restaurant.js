const express = require('express');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');
const sha256 = require('sha256');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const { Restaurant } = require('../db/models')
const { Dish } = require('../db/models')


//FUNCTIONS----------------------------------------------------------------------------------

function captchaValidation(captchaToken){
    const secret_key = process.env.CAPTCHA_privateKey;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captchaToken}`;
    request(url, (err,response,body) => {
        body = JSON.parse(body);
        if(body.success){
            return true
        } else {
            return false
        }
    })
}


function registerRestaurantDB(body){

         //HASH PASSWORD
    var myPlaintextPassword = body.password;
    const salt = crypto.randomBytes(16).toString("hex")
    plainPassword = salt.concat(myPlaintextPassword)
    hashedpassword = sha256(plainPassword)

    

    //REGISTER THE USER IN THE DB
    let newRestaurant = new Restaurant({
        restaurantName: body.restaurantName,
        password: hashedpassword,
        phone: body.phone,
        address: body.address,
        city: body.city,
        country: body.country,
        zip: body.zip,
        website: body.website,
        email: body.email,
        isConfirmed: false,
        abonnement: "STANDARD",
        salt: salt,
        stripe_cus_id: " ",
        dishes: [] 
    })

    //SAVE IT IN THE DB
    newRestaurant.save()
    return newRestaurant
    

}

function sendEmail(output,email){
    
        

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
		auth: {
			user: process.env.GMAIL_Username,
			pass: process.env.GMAIL_Password,
		}
     });
        
    //Option du mail
    let mailOptions = {
        from: `"QR MENU - Mail Confirmation" <${process.env.GMAIL_Username}>`, // sender address
        to: email, // list of receivers
        subject: 'QR Menu Confirmation', // Subject line
        text: output, // plain text body
        html: output // html body
    };
        
    //Envoie du mail
    transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
        }
                       
                  
        res.render('contact', {msg:'Email has been sent'});
     });
                    

}




//-------------------------------------------------------------------------------------------

//REGISTER A NEW RESTAURANT
/**
 * POST /restaurant
 * Purpose: Register a new Restaurant in the DB
 */
router.post('/', (req,res) => {

    try {
        //CAPTCHA VALIDATION
        const captcha_token = req.body.val.captchaToken
        if(captchaValidation(captcha_token)){ 
            res.status(400).send({msg : "Captcha Invalide"})
        }
        else{
            console.log("CAPTCHA VALIDE")
        }

        //REGISTERATION IN THE DB
        const body = req.body.val
        var newRestaurant = registerRestaurantDB(body)

        //SEND A CONFIRMATION EMAIL
        const secret = process.env.JWT_SECRET
        jwt.sign({
            user: _.pick(newRestaurant,'_id'),
        }, 
        secret, 
        {expiresIn : '15m'},
        (err,emailToken) => {
            const link = `${process.env.URI}/restaurant/confirmationEmail/${emailToken}`;
            const email = body.email
            //Le mail 
            const output = `
            <h1 style="font-style: 'Open Sans' ">Confirmez votre mail en cliquant sur le lien : </h1>
            <h3 style="font-style: 'Open Sans' ">Details </h3>
            <ul>  
            <li style="font-style: 'Open Sans' ">Restaurant Name: ${body.restaurantName}</li>
        
            <li style="font-style: 'Open Sans' ">Email: ${body.email}</li>
            </ul>
            <h3 style="font-style: 'Open Sans' " >Votre mail de confirmation</h3>
            <p style="font-style: 'Open Sans' ">${link}</p>
        </div>
        `;
            sendEmail(output,email);
        })

        res.status(200).send({msg : "Tout est bon"})
    } catch(e){
        res.status(400).send({msg : "Une erreur est survenu"})
    }
    
})


//CONFIRMATION EMAIL
/**
 * GET /confirmationEmail/:token
 * Purpose: Change the state of one account to confirmed
 */
 router.get('/confirmationEmail/:token', async (req,res) => {
    const {token} = req.params

    try {
    
        const { user: {_id}} = jwt.verify(token, process.env.JWT_SECRET);
        
        await Restaurant.findByIdAndUpdate({_id},{"isConfirmed": true});
        
        //SESSION CONNECTION
        req.session.userId = _id
       
        res.redirect(`${process.env.URI_FRONT}/choixAbonnement`);
        
    } catch(err){
       
        res.send("le token a expire veuillez vous reinscrire")
        
    }

 })

//GET THE ACTUAL CONNECTED RESTAURANT
/**
 * GET /restaurant
 * Purpose: Get Infos of the restaurant
 */
 router.get('/', async (req,res) => {
    try {
        const { userId } = req.session
        const Utilisateur = await Restaurant.findById(userId)
        res.status(200).send(Utilisateur)

     }catch(e){
        res.status(400).send({msg : "erreur"})
     }
 })


 //GET ANY RESTAURANT WITH ID
 /**
 * GET /restaurant/:id
 * Purpose: Get Infos of the restaurant
 */
  router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const Utilisateur = await Restaurant.findById(id)
        res.status(200).send(Utilisateur)

     }catch(e){
        res.status(400).send({msg : "This Restaurant doesn't exist"})
     }
 })


 router.post('/connection', async (req,res) => {
    let champsVerification = []

    try {
        var strangerInfo = req.body.val;
       
        var strangerEmail = strangerInfo['email']
        var strangerPassword = strangerInfo['password']

        var userEmailConfirmation = await Restaurant.findOne({email : strangerEmail}).distinct('isConfirmed')
        var userSalt = await Restaurant.findOne({email : strangerEmail}).distinct('salt')
        var userPasswordHash = await Restaurant.findOne({email : strangerEmail}).distinct('password')
        var userId = await Restaurant.findOne({email : strangerEmail}).distinct('_id')


        var strangerHashedPassword = sha256(userSalt[0].concat(strangerPassword));


        if(userEmailConfirmation[0]){
            champsVerification.push(true)
        } else {
            champsVerification.push(false)
        }


        if(strangerHashedPassword == userPasswordHash[0]){
            champsVerification.push(true)
        } else {
            champsVerification.push(false)
        }

        let isEveryChampValid = champsVerification.every(function(champ){
            return champ == true
        })

        if(isEveryChampValid){
            req.session.userId = userId
            res.status(200).send()
        } else {
            res.status(406).send()
        }
 
    } catch(err) {
        res.status(400).send()
    }
 })



module.exports = router;
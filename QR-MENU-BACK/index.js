
//IMPORTS
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const {mongoose} = require('./db/mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')

//ENVIRONMENT VARIABLES
require('dotenv').config();


app.use(session({
    name: `${process.env.SESSION_NAME}`,
    secret: `${process.env.SESSION_PASSWORD}`,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
		mongoUrl: process.env.DATABASE,
		collectionName: 'sessions',
		UnifiedTopology : true
	  }),
	cookie: {
        Secure: true,
        httpOnly: true,
        SameSite: true,
		maxAge: 1000 * 60 * 60 * 24
	}
}));



// //CORS
app.all('/*', function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.use(cors({origin: [
    `${process.env.URI_FRONT}`
  ], credentials: true}));

//MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); 


//ROUTES
app.use('/restaurant', require('./routes/restaurant.js'));
app.use('/dish', require('./routes/dish.js'));
app.use('/payment', require('./routes/payment.js'));
app.use('/authorisation', require('./routes/authorisation.js'))


//PORT CONNECTION
const PORT = process.env.PORT
app.listen( PORT || 5000,() => {
    console.log(`Server is listening on port ${PORT}`);
})
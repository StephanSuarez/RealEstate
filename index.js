import express from 'express';

import routerLog from './api/routing/userRoute.js';
import routerProperties from './api/routing/propertiesRoute.js'
import routerPublic from './api/routing/appRoute.js';
import routerApi from './api/routing/apiRotue.js';

import sequelizedb from './config/db.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';


// App Express created
const app = express();
const port = 3000;

// Set csurf 
app.use( cookieParser() );
app.use(session({
    secret: '3x4mpl3S3cr3tK3yF0rY0urApp',
    resave: false,
    saveUninitialized: true
}))

// Enable Reading data from a form
app.use( express.urlencoded({ extended: true }) );


// Sql Server Connection by Sequelize
try{
    await sequelizedb.authenticate();
    sequelizedb.sync();
    console.log('Successful connection to database');
}catch(error){
    console.log('Error connection to DataBase---', error);
}


// aviable pug
app.set('view engine', 'pug');
app.set('views', './views');


// Public file
app.use( express.static("public") );


// Routing
app.use('/authentication', routerLog);
app.use('/', routerPublic);
app.use('/', routerProperties);

// APIs Routes
app.use('/api', routerApi);

// Middleware to handle routes not found
app.use((req, res, next) => {
    res.redirect('/404');
});

app.listen( process.env.PORT ?? port, ()=>{
    console.log(`Listen in port ${port}`);
    if(process.env.enviroment=='development'){
        console.log(`Running http://localhost:3000/`);
    }
})

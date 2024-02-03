const express= require("express");
const session = require('express-session');
const hashedSecret = require('./config/config.js');
const routes = require('./routes/routes.js')
const app= express();
const PORT=4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
    session({
        secret: hashedSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
    );
    
app.use("/", routes);

app.listen(PORT,()=>{
    console.log(`Express escuchando en el puerto http://localhost${PORT}`)
})
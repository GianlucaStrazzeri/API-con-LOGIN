const jwt = require ('jsonwebtoken');//instalo el jwt
const hashedSecret = require('../config/config.js'); // requiero el encriptador de contraseña
const axios = require("axios");//Requerir axios

//Generar la información del token
const generateToken = (user) => {//esto generara un token con su encabezado,payload,signature.
    return jwt.sign({ user: user.id }, hashedSecret, {expiresIn:'1h'})
};

//verificar La información del token
const verifyToken = (req,res,next) => {
    const token = req.session.token;

    if (!token){
        return res.status(401).json({message:'token no generado'})
    }
    jwt.verify(token,hashedSecret,(err,decoded) => {
        if(err){
            return res.status(401).json({message:'token invalido'})
        }
        req.user = decoded.user;
        next();
    })
}




module.exports = {generateToken,verifyToken};
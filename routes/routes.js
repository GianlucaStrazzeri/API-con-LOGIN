const express =require("express") //requiero express
const { generateToken, verifyToken } = require("../middlewares/middlewares")//requiero función verifyToken desde carpeta middlewares
const routes = express.Router()//utilizo función de express para enrutar

const users = require('../data/users') //requiero users desde carpeta data/users

routes.get("/",(req, res)=>{//creando ruta de inicio, con un login form
    const loginForm = `
        <form action="/login" method="post">
            <label for="username">Usuario:</label>
            <input type="type" id="username" name="username" require><br>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Iniciar sesión</button>
        <form> 
    `;
    const dashboardLink = `<a href="/dashboard">dashboard</a>`;
    const logoutButton = `
        <form action="/logout" method="post">
            <button type="submit">Cerrar sesión</but on>
        </form>    
    `;

    let homeHTML = '';
    if(req.session.token) {
        homeHTML = dashboardLink + logoutButton;
    } else {
        homeHTML = loginForm + dashboardLink;
    }
    res.send(loginForm)
});

// falta requerir 

// routes.post("/search/:nombre",(req,res)=>{
//     const search=`<form action=/search>
//     <label for="Character">Character </label>
//     <input type="text" name="name">
//     </form>`
//     res.redirect("/character/:nombre")
// })

routes.post("/login",verifyToken ,(req, res)=>{
    //esto compara lo que ha introducido el usuario
    const {username,password} = req.body;
    const user = users.find((user)=> user.username === username && user.password === password)
    if (user){
        const token = generateToken(user);
        req.session.token = token;
        res.redirect('/dashboard');
    }else{
        res.status(401).json({message:'credenciales incorrectas'})
    }
});

routes.post("/logout",(req, res)=>{
    session.destroy()
    res.redirect("/");
    
});


routes.get('/dashboard',(req, res) => {
    const dashboard = `
        hola
    `;
    res.send(dashboard);
});

module.exports = routes;



// app.get("/characters/:name", async (req, res) => {
//     const rickymortyName = req.params.name//si cogiera name se quedaria el objeto y hay que acceder con dotacion a name y te tira el string 
//     const characterUrl= `https://rickandmortyapi.com/api/character/?name=${rickymortyName}`//podrias haber usado ${url}${rickymortyName}

//     try {
//         const response = await axios.get(characterUrl)
//         const Personaje= response.data.results[0];
//         res.json(Personaje)
//     } catch (ERROR) {
//         res.status(404).json({error:"Personaje no encontrado"})

//     }
// })

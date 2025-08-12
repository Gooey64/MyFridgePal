import express from 'express'; //Imports Express.js

const app = express() //Creates an Express application instance
const port = process.env.PORT || 3000

app.get('/', (req, res) => { 
        res.send('Login Page')
}) //Defines a route for the login page.

app.get('/signup', (req, res) => { 
        res.send('Signup Page')
}) //Defines a route for the signup page.

app.get('/home', (req, res) => { 
        res.send('Home Page')
}) //Defines a route for the home page where you can see all your fridges.

app.listen(port, () => {
        console.log(`MyFridgePal app listening on port ${port}`)
}) //Starts the server on port 3000 and logs a confirmation message


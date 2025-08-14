import express from 'express'; //Imports Express.js
import foodsRoutes from './routes/foodsRoutes.js';
import fridgesRoutes from './routes/fridgesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

const app = express() //Creates an Express application instance
const port = process.env.PORT || 3000

app.use('/foods', foodsRoutes);
app.use('/fridges', fridgesRoutes);
app.use('/users', usersRoutes);

/* Porting */

app.listen(port, () => {
        console.log(`MyFridgePal app listening on port ${port}`)
}) //Starts the server on port 3000 and logs a confirmation message


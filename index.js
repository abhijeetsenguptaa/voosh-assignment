require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Import the 'path' module
const cookieParser = require('cookie-parser');
const connection = require('./configs/connection');
const userRouter = require('./routers/users.routes');
const productRouter = require('./routers/products.routes');


const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/uploads', express.static('uploads')); // Check the static images
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Database is successfully connected.');
    } catch (error) {
        console.log(error);
    }
    console.log('Server is running on the port ' + PORT);
}); // Add a closing parenthesis for the 'app.listen' function call

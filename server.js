const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });

const dbConnection = require('./config/database');
dbConnection();
const categoryRoute = require('./routes/categoryRoute');



// express app
const app = express();

// middlewares
app.use(express.json());  // to parse json data
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`node: ${process.env.NODE_ENV}`);
}



// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to E-commerce API', version: 'v1' });
});

// Mounted routes
app.use('/api/v1/categories', categoryRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

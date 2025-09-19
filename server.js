const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });

const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

dbConnection();

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

// Handle unmatched routes - catch all middleware using * pattern
app.use((req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});





// Global error handling middleware for unhandled errors in the app 
app.use(globalError); // to faciltate reading code 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

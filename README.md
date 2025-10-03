# Node.js E-Commerce API

A robust RESTful API for e-commerce applications built with Node.js, Express.js, and MongoDB. This API provides comprehensive functionality for managing products, categories, brands, users, and authentication with advanced features like image upload, email notifications, and JWT-based authentication.

## Features

### Authentication & Authorization
- **User Registration & Login** with JWT tokens
- **Password Reset** via email with 6-digit verification codes
- **Role-based Access Control** (Admin, Manager, User)
- **Password Encryption** using bcryptjs
- **JWT Token Management** with configurable expiration

### Product Management
- **CRUD Operations** for products
- **Image Upload & Processing** with Sharp (cover image + gallery)
- **Product Search & Filtering**
- **Product Categories & Subcategories**
- **Brand Management**
- **Slug Generation** for SEO-friendly URLs

### User Management
- **User Profiles** with image upload
- **User CRUD Operations** (Admin only)
- **Profile Image Processing**
- **User Validation & Sanitization**

### Category & Brand System
- **Hierarchical Categories** with subcategories
- **Brand Management** with image upload
- **Slug-based URLs** for better SEO
- **Image Processing** for category/brand logos

### Email System
- **Automated Email Notifications**
- **Password Reset Emails** with verification codes
- **Gmail SMTP Integration**
- **HTML Email Templates**

### Advanced Features
- **Input Validation** using express-validator
- **Error Handling** with custom error classes
- **Image Upload & Resizing** with Multer and Sharp
- **API Features** (Pagination, Sorting, Filtering, Search)
- **Development Logging** with Morgan
- **Cross-platform** environment support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Image Processing**: Sharp, Multer
- **Email Service**: Nodemailer (Gmail SMTP)
- **Validation**: Express-validator
- **Password Hashing**: bcryptjs
- **Development**: Nodemon, Morgan
- **Environment**: dotenv
- **Utilities**: Slugify, UUID, Colors

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** database (local or cloud)
- **Gmail account** with App Password for email services
- **Git** for version control

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/NASSWIEL/nodejs-ecommerce-api.git
cd nodejs-ecommerce-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `config.env` file in the root directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development
BASE_URL=http://localhost:8000

# Database
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_EXPIRE_TIME=90d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

### 4. Start the Application

**Development Mode:**
```bash
npm run start:dev
```

**Production Mode:**
```bash
npm run start:prod
```

The server will start on `http://localhost:8000`

## API Documentation

### Authentication Endpoints
```
POST /api/v1/auth/signup          # User registration
POST /api/v1/auth/login           # User login
POST /api/v1/auth/forgetPassword  # Send password reset code
POST /api/v1/auth/verifyResetCode # Verify reset code
POST /api/v1/auth/resetPassword   # Reset password
```

### Product Endpoints
```
GET    /api/v1/products           # Get all products
GET    /api/v1/products/:id       # Get specific product
POST   /api/v1/products           # Create product (Admin/Manager)
PUT    /api/v1/products/:id       # Update product (Admin/Manager)
DELETE /api/v1/products/:id       # Delete product (Admin)
```

### Category Endpoints
```
GET    /api/v1/categories         # Get all categories
GET    /api/v1/categories/:id     # Get specific category
POST   /api/v1/categories         # Create category (Admin/Manager)
PUT    /api/v1/categories/:id     # Update category (Admin/Manager)
DELETE /api/v1/categories/:id     # Delete category (Admin)
```

### Subcategory Endpoints
```
GET    /api/v1/subcategories      # Get all subcategories
GET    /api/v1/subcategories/:id  # Get specific subcategory
POST   /api/v1/subcategories      # Create subcategory (Admin/Manager)
PUT    /api/v1/subcategories/:id  # Update subcategory (Admin/Manager)
DELETE /api/v1/subcategories/:id  # Delete subcategory (Admin)
```

### Brand Endpoints
```
GET    /api/v1/brands             # Get all brands
GET    /api/v1/brands/:id         # Get specific brand
POST   /api/v1/brands             # Create brand (Admin/Manager)
PUT    /api/v1/brands/:id         # Update brand (Admin/Manager)
DELETE /api/v1/brands/:id         # Delete brand (Admin)
```

### User Management Endpoints
```
GET    /api/v1/users              # Get all users (Admin)
GET    /api/v1/users/:id          # Get specific user (Admin)
POST   /api/v1/users              # Create user (Admin)
PUT    /api/v1/users/:id          # Update user (Admin)
DELETE /api/v1/users/:id          # Delete user (Admin)
```

## Project Structure

```
nodejs-ecommerce-api/
├── config/
│   └── database.js              # Database connection
├── middlewares/
│   ├── errorMiddleware.js       # Global error handling
│   ├── uploadImageMiddleware.js # Image upload logic
│   └── validatorMiddleware.js   # Validation middleware
├── models/
│   ├── brandModel.js           # Brand schema
│   ├── categoryModel.js        # Category schema
│   ├── productModel.js         # Product schema
│   ├── subCategoryModel.js     # Subcategory schema
│   └── userModel.js            # User schema
├── routes/
│   ├── authRoute.js            # Authentication routes
│   ├── brandRoute.js           # Brand routes
│   ├── categoryRoute.js        # Category routes
│   ├── productRoute.js         # Product routes
│   ├── subCategoryRoute.js     # Subcategory routes
│   └── userRoute.js            # User routes
├── services/
│   ├── authService.js          # Authentication logic
│   ├── brandService.js         # Brand business logic
│   ├── categoryService.js      # Category business logic
│   ├── handlersFactory.js      # Generic CRUD handlers
│   ├── productService.js       # Product business logic
│   ├── subCategoryService.js   # Subcategory business logic
│   └── userService.js          # User business logic
├── utils/
│   ├── validators/             # Input validation schemas
│   ├── apiError.js             # Custom error class
│   ├── apiFeatures.js          # API utilities (pagination, search, etc.)
│   ├── createToken.js          # JWT token creation
│   └── sendEmail.js            # Email sending utility
├── uploads/                    # Static files (images)
│   ├── brands/
│   ├── categories/
│   ├── products/
│   └── users/
├── config.env                  # Environment variables
├── package.json               # Dependencies and scripts
└── server.js                  # Application entry point
```

## Configuration

### Gmail Setup for Email Services

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use the 16-character password in `EMAIL_PASSWORD`

### MongoDB Setup

**Cloud (MongoDB Atlas):**
```env
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

**Local MongoDB:**
```env
DB_URI=mongodb://localhost:27017/ecommerce-db
```

## License

This project is licensed under the **ISC License**.


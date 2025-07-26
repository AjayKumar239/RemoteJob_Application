const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:3000'], // Allow your frontend domains
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Starting server setup...');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Health check route
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Server is working!' });
});

// Routes
try {
  console.log('Loading auth routes...');
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading auth routes:', error.message);
  console.error('Full error:', error);
}


try {
  const userRoutes = require('./routes/user');
  app.use('/api/user', userRoutes);
  console.log('✅ User routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading user routes:', error.message);
}
// try {
//   console.log('Loading user routes...');
//   const userRoutes = require('./routes/user');
//   app.use('/api/user', userRoutes);
//   console.log('✅ User routes loaded successfully');
// } catch (error) {
//   console.error('❌ Error loading user routes:', error.message);
//   // console.error('Full error:', error);
// }

// 404 handler for unmatched routes
// app.use('*', (req, res) => {
//   console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
//   res.status(404).json({ 
//     success: false,
//     message: `Route ${req.method} ${req.originalUrl} not found` 
//   });
// });

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Debug users: http://localhost:${PORT}/api/auth/debug-users`);
  console.log(`📍 Frontend should be on: http://localhost:8081`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});


// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:8081', 'http://localhost:3000'], // Allow your frontend domains
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// console.log('Starting server setup...');

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log('✅ MongoDB connected successfully'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
//   });
// });

// // Test route
// app.get('/test', (req, res) => {
//   res.json({ message: 'Server is working!' });
// });

// // Routes
// try {
//   const authRoutes = require('./routes/auth');
//   app.use('/api/auth', authRoutes);
//   console.log('✅ Auth routes loaded successfully');
// } catch (error) {
//   console.error('❌ Error loading auth routes:', error.message);
// }

try {
  const userRoutes = require('./routes/user');
  app.use('/api/user', userRoutes);
  console.log('✅ User routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading user routes:', error.message);
}

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
//   console.log(`📍 Debug users: http://localhost:${PORT}/api/auth/debug-users`);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (error) => {
//   console.error('Unhandled Rejection:', error);
// });




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// console.log('Starting server setup...');

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString()
//   });
// });

// console.log('Setting up /api/health route - OK');

// // Test route to check if basic routing works
// app.get('/test', (req, res) => {
//   res.json({ message: 'Server is working!' });
// });

// console.log('Setting up /test route - OK');

// // Try to load user routes
// try {
//   console.log('Attempting to load user routes...');
//   const userRoutes = require('./routes/user');
//   app.use('/api/user', userRoutes);
//   console.log('User routes loaded successfully!');
// } catch (error) {
//   console.error('Error loading user routes:', error.message);
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
//   console.log(`📍 Test route: http://localhost:${PORT}/test`);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (error) => {
//   console.error('Unhandled Rejection:', error);
// });




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // CORS
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? 'your-frontend-domain.com' 
//     : 'http://localhost:5173',
//   credentials: true
// }));

// // Body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Static folder for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/user', require('./routes/user'));
// app.use('/api', require('./routes/subscription'));


// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

























// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // 🛡️ Security middleware
// app.use(helmet());

// // 🚫 Rate limiting
// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// }));

// // 🌐 CORS
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production'
//     ? 'https://your-frontend-domain.com'
//     : 'http://localhost:5173',
//   credentials: true
// }));

// // 🔄 Body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // 📁 Static file serving
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // 🌱 MongoDB connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // 🛣️ API routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/user', require('./routes/user'));
// app.use('/api', require('./routes/subscription'));

// // ✅ Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // ❗ Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // ❓ 404 fallback
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // 🚀 Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // CORS
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? 'your-frontend-domain.com' 
//     : 'http://localhost:5173',
//   credentials: true
// }));

// // Body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Static folder for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/user', require('./routes/user'));
// app.use('/api', require('./routes/subscription'));


// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

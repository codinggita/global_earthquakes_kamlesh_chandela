const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./config/db.config');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimit.middleware');
const { loggerMiddleware } = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');
const v1Routes = require('./routes/index');

const app = express();

// Trust reverse proxy (Render, AWS, Heroku, Nginx)
app.set('trust proxy', 1);

connectDB();

app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
}));

app.options('*', cors()); // Enable pre-flight for all routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(loggerMiddleware);
app.use('/api', apiLimiter);
app.use('/api/v1/auth', authLimiter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use('/api/v1', v1Routes);

app.all('*', (req, res, next) => {
  next(new AppError('Cannot find ' + req.originalUrl + ' on this server!', 404));
});

app.use(errorHandler);

module.exports = app;

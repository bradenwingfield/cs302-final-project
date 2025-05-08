import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import municipalRouter from './routes/municipal';

// Reads in the .env file
dotenv.config();

// Initiates use of express and establishes port
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // http requests
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Use json to parse requests
app.use(express.json());

// Establishes router to the /api/municipal route
app.use('/api/municipal', municipalRouter);

// Connect to database
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Mongo error:', err));

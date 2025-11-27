import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
//import userRoutes from './src/routes/userRoutes.js';
import portfolioRoutes from './src/routes/portfolioRoutes.js';
import cors from 'cors';


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// Allow requests from your frontend origin
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
  ],
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Routes
app.use('/api/portfolio', portfolioRoutes);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


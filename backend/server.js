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
  origin: 'http://10.200.40.129:5173',  // frontend origin
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/getAccountInfo', portfolioRoutes);
//app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

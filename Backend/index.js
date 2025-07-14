import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRoutes from './routes/UserRoutes.js'
import TodoRoutes from './routes/TodoRoutes.js'

dotenv.config(); // Initialize dotenv

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());



// Routes

app.use('/api/user',AuthRoutes);
app.use('/api/todo',TodoRoutes);


app.get('/', (req, res) => res.send('Server is Live'));

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI, {

  })
  .then(() => {
    console.log('✅ Database connected');
    app.listen(port, () =>
      console.log(`🚀 Server listening at http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error.message);
  });
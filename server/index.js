import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello From DaLL-E!');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5174, () =>
      console.log('Server has started on port http://localhost:5174')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

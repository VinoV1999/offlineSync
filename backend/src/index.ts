import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users', userRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

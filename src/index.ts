import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/* route imports */
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

/* config */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* routes */
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

/* server */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
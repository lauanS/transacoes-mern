import express from 'express';
import cors from 'cors';
import dbConnect from '@/config/dbConnect';
import routes from '@/routes';
const PORT = process.env.API_PORT;

dbConnect();

const app = express();

app.use(cors());
routes(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

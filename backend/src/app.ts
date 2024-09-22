import express from 'express';
import dbConnect from '@/config/dbConnect';
import routes from '@/routes';
const PORT = process.env.API_PORT;

dbConnect();

const app = express();
routes(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

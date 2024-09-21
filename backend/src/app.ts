import express from 'express';
import dbConnect from '@/config/dbConnect';
const PORT = process.env.API_PORT;

dbConnect();

const app = express();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

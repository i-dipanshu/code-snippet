import { config } from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

config({path: "./config/config.env"});

connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running at port ${process.env.PORT}`);
});
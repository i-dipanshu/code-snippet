import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Database is configured and connected at ${data.connection.host}.`);
    })
}

export default connectDB;
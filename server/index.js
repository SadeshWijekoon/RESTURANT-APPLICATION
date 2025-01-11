import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js'; // Now importing connectDB
import userRouter from './route/user.route.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Server is running on port " + PORT,
    });
});

app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}

export default app;

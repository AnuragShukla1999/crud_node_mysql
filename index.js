import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import budgetRouter from './routes/budgetRoute.js'
import acutalRouter from './routes/actualRoute.js'

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.use('/api', budgetRouter)
app.use('/api', acutalRouter)



app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
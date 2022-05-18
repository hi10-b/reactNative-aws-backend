//connection to mongoDB
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const uri = process.env.ATLAS_URI;
// const uri = "mongodb://localhost:27017/Sales";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('account mongodb connection succesful');
});

//connects to user router
const userRouter = require('./routes/Auth/userRoute');
const salesRouter = require('./routes/Sales/salesRoute');
const expensesRouter = require('./routes/Expenses/expensesRoute');

app.use('/users', userRouter);
app.use('/sales', salesRouter);
app.use('/expenses', expensesRouter);

app.listen(port, () => {
	console.log(`server is running yay: ${port}`);
});

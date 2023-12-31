import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

dotenv.config();

mongoose
  .connect("mongodb+srv://shishpal:Golu%404710@cluster0.hy9yr.mongodb.net/maaco?retryWrites=true")
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app=express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// app.get('/',(req,res)=>{
//   res.send("hello world");
// })


app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'build')));


app.get('*',(req,res) =>
res.sendFile(path.join(__dirname,'/build/index.html')))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is working is post number:${PORT}`)
})
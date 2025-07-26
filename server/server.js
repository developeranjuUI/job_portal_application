import 'dotenv/config';
import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import CompanyRoutes from './routes/CompanyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {clerkMiddleware} from '@clerk/express';
import process from 'process';

// initialize express
const app = express();

await connectDB();
await connectCloudinary();

// middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


// Routes
app.get('/',(req,res)=>res.send("API working"))

app.get("/debug-sentry", function mainHandler() {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebhooks)
app.use('/api/company', CompanyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users',userRoutes)

// port 

const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

// app.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`)
// })
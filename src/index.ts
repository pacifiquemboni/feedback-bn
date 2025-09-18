import express from "express";
import { AppDataSource } from "./db/db";
import cors from "cors";
import { CorsOptions } from 'cors';
import passport from "passport";
import session from "express-session";

import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedbackRoutes";
dotenv.config();
const app = express();


const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/user", userRoutes);
//initialize passport
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/feedback", feedbackRoutes)

AppDataSource.initialize();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



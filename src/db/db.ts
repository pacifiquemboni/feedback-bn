import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Feedback } from "../models/FeedBack";
import { Comment } from "../models/comments";
import { Upvote } from "../models/upvotes";
// import { Review } from "../models/Review";
config();
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [Feedback, Comment, Upvote],
 
});

//initialize the database
AppDataSource.initialize()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Error initializing database", err);
  });

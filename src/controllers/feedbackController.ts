import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { Feedback } from "../models/FeedBack";

export class FeedbackController {
    // Controller methods will go here
    static async createFeedback(req: Request, res: Response) {
        // Implementation for creating feedback
        try {
            const { title, description, category } = req.body;
            if (!title || !description || !category) {
                res.status(400).json({ message: "Title, description, and category are required" });
                return;
            }
            const feedbackRepository = AppDataSource.getRepository(Feedback);
            const feedback = feedbackRepository.create({ title, description, category });
            await feedbackRepository.save(feedback);
            res.status(201).json(feedback);
        } catch (error) {
            res.status(500).json({ message: "Error creating feedback", error });
        }
    }

    static async getCommentbyFeedbackId(req: Request, res: Response) {
        // Implementation for retrieving comments by feedback ID
        try {
            const { feedbackId } = req.params;
            const commentRepository = AppDataSource.getRepository("Comment");
            const comments = await commentRepository.find({ where: { feedback: { id: feedbackId } } });
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving comments", error });
        }
    }

    static async getAllFeedbacks(req: Request, res: Response) {
  try {
    const feedbackRepository = AppDataSource.getRepository(Feedback);
    
    // Get search query from request (e.g., ?search=dark)
    const search = (req.query.search as string)?.trim();

    // Build query
    const query = feedbackRepository.createQueryBuilder("feedback")
      .leftJoinAndSelect("feedback.comment", "comment")
      .orderBy("feedback.upvotes", "DESC");

    if (search) {
      query.where("feedback.title ILIKE :search OR feedback.description ILIKE :search", {
        search: `%${search}%`,
      });
    }

    const feedbacks = await query.getMany();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedbacks", error });
  }
}

    static async updateFeedback(req: Request, res: Response) {
        // Implementation for updating feedback
        try {
            const { id } = req.params;
            const { title, description, category } = req.body;
            const feedbackRepository = AppDataSource.getRepository(Feedback);
            const feedback = await feedbackRepository.findOne({ where: { id } });
            if (!feedback) {
                res.status(404).json({ message: "Feedback not found" });
                return;
            }
            feedback.title = title;
            feedback.description = description;
            feedback.category = category;
            await feedbackRepository.save(feedback);
            res.status(200).json(feedback);
        } catch (error) {
            res.status(500).json({ message: "Error updating feedback", error });
        }
    }
    static async deleteFeedback(req: Request, res: Response) {
        // Implementation for deleting feedback
        try {
            const { id } = req.params;
            const feedbackRepository = AppDataSource.getRepository(Feedback);
            const feedback = await feedbackRepository.findOne({ where: { id } });
            if (!feedback) {
                res.status(404).json({ message: "Feedback not found" });
                return;
            }
            await feedbackRepository.remove(feedback);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting feedback", error });
        }
    }


    static async createUpvote(req: Request, res: Response) {
        // Implementation for creating an upvote
        try {
            const { feedbackId } = req.body;
            if (!feedbackId) {
                res.status(400).json({ message: "Feedback ID is required" });
                return;
            }
            const feedbackRepository = AppDataSource.getRepository(Feedback);
            const feedback = await feedbackRepository.findOne({ where: { id: feedbackId } });
            if (!feedback) {
                res.status(404).json({ message: "Feedback not found" });
                return;
            }
            const currentUpvotes = Number(feedback.upvotes) ?? 0;
            const newUpvotes = currentUpvotes + 1;
            // console.log("Current upvotes:", currentUpvotes, "New upvotes:", newUpvotes);
            feedback.upvotes = newUpvotes;
            await feedbackRepository.save(feedback);
            res.status(200).json(feedback);
        } catch (error) {
            res.status(500).json({ message: "Error creating upvote", error });
        }
    }

    static async createDownvote(req: Request, res: Response) {
        // Implementation for creating a downvote
        try {
            const { feedbackId } = req.body;
            if (!feedbackId) {
                res.status(400).json({ message: "Feedback ID is required" });
                return;
            }
            const feedbackRepository = AppDataSource.getRepository(Feedback);
            const feedback = await feedbackRepository.findOne({ where: { id: feedbackId } });
            if (!feedback) {
                res.status(404).json({ message: "Feedback not found" });
                return;
            }
            feedback.upvotes = Math.max(0, feedback.upvotes - 1); // Prevent negative upvotes
            await feedbackRepository.save(feedback);
            res.status(200).json(feedback);
        } catch (error) {
            res.status(500).json({ message: "Error creating downvote", error });
        }
    }

    static async createComment(req: Request, res: Response) {
        // Implementation for creating a comment
        try {
            const { feedbackId, comment } = req.body;
            if (!feedbackId || !comment) {
                res.status(400).json({ message: "Feedback ID and comment are required" });
                return;
            }
            const feedbackRepository = AppDataSource.getRepository(Feedback);
            const feedback = await feedbackRepository.findOne({ where: { id: feedbackId } });
            if (!feedback) {
                res.status(404).json({ message: "Feedback not found" });
                return;
            }
            const commentRepository = AppDataSource.getRepository("Comment");
            const newComment = commentRepository.create({ feedback, comment });
            await commentRepository.save(newComment);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ message: "Error creating comment", error });
        }
    }
}
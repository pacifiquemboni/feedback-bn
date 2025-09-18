import { Router } from "express";
import { FeedbackController } from "../controllers/feedbackController";

const router = Router();

router.post("/", FeedbackController.createFeedback);
router.get("/", FeedbackController.getAllFeedbacks);
router.put("/:id", FeedbackController.updateFeedback);
router.delete("/:id", FeedbackController.deleteFeedback);

router.post("/upvote", FeedbackController.createUpvote);
router.post("/downvote", FeedbackController.createDownvote);
router.post("/comment", FeedbackController.createComment);
router.get("/comments/:feedbackId", FeedbackController.getCommentbyFeedbackId);
export default router;

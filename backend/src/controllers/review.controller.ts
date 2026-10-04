import { Request, Response } from "express";
import { ReviewService } from "../services/review.service.js";

export class ReviewController {
  static async submitReview(req: Request, res: Response) {
    try {
      const review = await ReviewService.submitReview(req.body);
      res.status(201).json({ success: true, data: review });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getQueue(req: Request, res: Response) {
    try {
      const queue = await ReviewService.getReviewQueue();
      res.json({ success: true, data: queue });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getAuditLogs(req: Request, res: Response) {
    try {
      const logs = await ReviewService.getAuditLogs();
      res.json({ success: true, data: logs });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

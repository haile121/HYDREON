import { Request, Response } from "express";
import { ObservationService } from "../services/observation.service.js";

export class ObservationController {
  static async create(req: Request, res: Response) {
    try {
      const result = await ObservationService.createObservation(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const filters = {
        status: req.query.status as string,
        priority: req.query.priority as string,
        siteId: req.query.siteId as string,
      };
      const observations = await ObservationService.listObservations(filters);
      res.json({ success: true, data: observations });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const observation = await ObservationService.getObservationById(
        req.params.id,
      );
      if (!observation) {
        return res
          .status(404)
          .json({ success: false, error: "Observation not found" });
      }
      res.json({ success: true, data: observation });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async analyze(req: Request, res: Response) {
    try {
      const analysis = await ObservationService.triggerAIAnalysis(
        req.params.id,
      );
      res.json({ success: true, data: analysis });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}

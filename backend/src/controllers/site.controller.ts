import { Request, Response } from "express";
import { SiteService } from "../services/site.service.js";

export class SiteController {
  static async listSites(req: Request, res: Response) {
    try {
      const sites = await SiteService.listSites();
      res.json({ success: true, data: sites });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getSiteById(req: Request, res: Response) {
    try {
      const siteData = await SiteService.getSiteById(req.params.id);
      res.json({ success: true, data: siteData });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  static async getMapObservations(req: Request, res: Response) {
    try {
      const mapPoints = await SiteService.getMapObservations();
      res.json({ success: true, data: mapPoints });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

import { Router } from "express";
import { ObservationController } from "../controllers/observation.controller.js";
import { ReviewController } from "../controllers/review.controller.js";
import { SiteController } from "../controllers/site.controller.js";

const router = Router();

// Observation Routes
router.post("/observations", ObservationController.create);
router.get("/observations", ObservationController.list);
router.get("/observations/:id", ObservationController.getById);
router.post("/observations/:id/analyze", ObservationController.analyze);

// Reviewer Routes
router.post("/reviews", ReviewController.submitReview);
router.get("/reviews/queue", ReviewController.getQueue);
router.get("/reviews/audit", ReviewController.getAuditLogs);

// Map & Site Intelligence Routes
router.get("/map/observations", SiteController.getMapObservations);
router.get("/sites", SiteController.listSites);
router.get("/sites/:id", SiteController.getSiteById);

export default router;

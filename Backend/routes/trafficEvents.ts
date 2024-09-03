import { parseNFLData } from "../helpers/parseNFLData";
import { TrafficEvent } from "../models/trafficEvents";
import { BadRequestError } from "../expressError";
import { Router } from "express";
import { fetchSeahawksDataFromEspnApi } from "../controllers/trafficEvents";

const router = Router();

/** GET /today
 * Returns all events today
 */
router.get("/today", async (req, res) => {
  console.log("GET/ today's events");

  //2024-09-03T18:21:03.531Z --> '2024-09-03'
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  const startDate = new Date(today);

  const endDate = new Date(today);
  endDate.setDate(startDate.getDate() + 1);

  try {
    const seahawksData = await fetchSeahawksDataFromEspnApi(req, res, startDate, endDate);

  } catch (e) {
    console.error("Issue with fetching today's events", e);
    throw new BadRequestError();
  }

});


export default router;



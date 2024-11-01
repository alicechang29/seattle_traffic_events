import { BadRequestError } from "../expressError";
import { Router } from "express";
import { fetchEventDataByStartDateAndStatus } from "../controllers/trafficEvents";

const router = Router();

/** GET /today
 * Returns all events today
 */
router.get("/today", async (req, res) => {
  console.log("GET/ today's events");

  // FIXME: the dates should come in from the request



  const status = ['STATUS_SCHEDULED', 'STATUS_IN_PROGRESS'];

  try {
    //TODO: need to finish this
    const data = await fetchEventDataByStartDateAndStatus(req, res);

    return res.status(201).json({ data });

  } catch (e) {
    console.error("Issue with fetching today's events", e);
    throw new BadRequestError();
  }

});


export default router;



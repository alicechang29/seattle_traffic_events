import { parseNFLData } from "../helpers/parseNFLData";
import { TrafficEvent } from "../models/trafficEvents";
import { BadRequestError } from "../expressError";
import { Router } from "express";

const router = Router();

const BASE_API_URL = `https://site.api.espn.com/apis/site/v2/sports`;

/** GET /events/nfl-seahawks from ESPN API
 * returns parsed nfl data
 */
router.get("/nfl-seahawks", async (req, res) => {
  console.log("get seahawks data");
  const teamId: number = 26;
  const season: number = 2024;
  const sport: string = "football";
  const league: string = "nfl";
  try {
    const response = await fetch(`${BASE_API_URL}/${sport}/${league}/teams/${teamId}/schedule?season=${season}&seasontype=2`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const parsedData = parseNFLData(data);
    res.json(parsedData);

    //TODO: best way to create events in DB?
    // possibly just turn this to a post route and add events data directly to DB

  } catch (e) {
    console.error("Error fetching data from ESPN API:", e);
    throw new BadRequestError();
  }
});

router.post("/", async function () {
  //   //TODO: add to DB
  //   const nflEvents = parseNFLData(data);

  //   for (let event of nflEvents) {
  //     TrafficEvent.create(event); //FIXME: fix the type
  //   }
});


// function requestMarinersEvents() {

// }

// function requestKrakenEvents() {

// }

export default router;



import { parseNFLData } from "../helpers/parseNFLData";
import { BadRequestError } from "../expressError";
// import { trafficEvent } from "../models/trafficEvents";
import type { espnEvent, tTrafficEvent } from "../types";
import { TrafficEvent } from "../models/trafficEvents";

const ESPN_BASE_API_URL = `https://site.api.espn.com/apis/site/v2/sports`;

/** Fetch seahawks data from espn API
 * Returns a list of events that are home games ("@ SEA" within shortName)
  [{
    name: "Denver Broncos at Seattle Seahawks",
    date: "2024-09-08T20:05Z",
    shortName: "DEN @ SEA",
    statusValue: "STATUS_SCHEDULED",
    statusCompleted: false,
    venue: "Lumen Field",
    zipcode: "98134"
  },...
]
*/
export const getSeahawksDataFromEspn = async (): Promise<any> => {
  console.log("Services/getSeahawksDataFromEspn");

  const teamId: number = 26;
  const season: number = 2024;
  const sport: string = "football";
  const league: string = "nfl";

  try {
    const response = await fetch(`${ESPN_BASE_API_URL}/${sport}/${league}/teams/${teamId}/schedule?season=${season}&seasontype=2`);

    const data = await response.json();
    console.log("SERVICES DATA", data);

    const seahawkEvents = parseNFLData(data);

    return seahawkEvents;

  } catch (e) {
    console.error("Error fetching data from ESPN API:", e);
    throw new BadRequestError();
  }
};



/** Syncs existing DB data with newly fetched events data from ESPN.
 * Creates new records in DB if event is new.
 * Returns...?
 */
export const syncSeahawksData = async (): Promise<any> => {
  console.log("Services/syncSeahawksData");

  try {
    //get the new data
    const fetchedSeahawksData: espnEvent[] = await getSeahawksDataFromEspn();

    //FIXME: redo this -- updates will happen more often than creates
    //query DB first and get the event ID --> make an update
    //else create event
    for (const record of fetchedSeahawksData) {

      try {
        //try creating a new record
        const newEvent = await TrafficEvent.create(record);
        console.log(`Created new event with ID: ${newEvent.id}`);

      } catch (e: any) {
        if (e.message && !isNaN(Number(e.message))) {
          const id = Number(e.message);
          const updatedEvent = await TrafficEvent.updateEvent(id, record);
          console.log(`Updated event Id: ${updatedEvent.id}`);
        } else {
          console.error(`Error processing: ${e.message}`);
        }

      }
    }
  } catch (err) {
    console.error("Error syncing Seahawks data:", err);
  }

};
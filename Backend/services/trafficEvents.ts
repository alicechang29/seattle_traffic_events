import { parseNFLData } from "../helpers/parseNFLData";
import { BadRequestError } from "../expressError";
// import { trafficEvent } from "../models/trafficEvents";
import type { espnEvent, tTrafficEvent } from "../types";
import { TrafficEvent } from "../models/trafficEvents";
import e from "express";

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

  const summary = { updated: 0, created: 0 };

  try {
    //get the new data
    const fetchedSeahawksData: espnEvent[] = await getSeahawksDataFromEspn();

    for (const record of fetchedSeahawksData) {
      console.log("RECORD", record);
      try {
        const existingEvent = await TrafficEvent.findEventByNameAndDate(
          record.name,
          new Date(record.startDate)
        );
        console.log("existing event", existingEvent);

        if (existingEvent) {
          await TrafficEvent.updateEvent(existingEvent.id, record);
          console.log(`Updated event with ID: ${existingEvent.id}`);
          summary.updated++;
        } else {
          await TrafficEvent.create(record);
          console.log(`Created event: ${record}`);
          summary.created++;
        }

      } catch (e) {
        console.error("Seahawks data sync failed at the service level", e);
      }
    }
  } catch (e) {
    console.error("Error fetching data from ESPN API:", e);
  }
  console.log(`Sync completed: ${summary.updated} updated, ${summary.created} created.`);
  return summary;
};
//TODO: fix the trafficEvents.update fn
console.log("TESTING SYNC", await syncSeahawksData());
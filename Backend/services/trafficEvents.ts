import { parseNFLData } from "../helpers/parseNFLData";
import { BadRequestError } from "../expressError";
// import { trafficEvent } from "../models/trafficEvents";
import type { espnEvents, tTrafficEvent } from "../types";

const ESPN_BASE_API_URL = `https://site.api.espn.com/apis/site/v2/sports`;

/** Fetch seahawks data from espn API*/
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

    const parsedData = parseNFLData(data);

    return parsedData;

  } catch (e) {
    console.error("Error fetching data from ESPN API:", e);
    throw new BadRequestError();
  }
};

console.log(getSeahawksDataFromEspn());

//save data fetched to DB

export const syncSeahawksData = async (): Promise<any> => {
  console.log("Services/syncSeahawksData");

  //get the new data
  const newSeahawksData: espnEvents = await getSeahawksDataFromEspn();
  const existingSeahawksData: tTrafficEvent[] = await trafficEvent.getEvents();

  const newRecords = [];
  const updateRecords = [];

  for (const record of newSeahawksData) {

  }

  //FIXME: handle this using a PUT request

  //if name, date, status are same = duplicate and skip


  //if name, date same = update -- TODO: handle later...

};
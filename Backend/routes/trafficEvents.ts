import { parseNFLData } from "../helpers/parseNFLData";
import { TrafficEvent } from "../models/trafficEvents";
// import express from "express";

// const app = express();
// const port = 8080;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}...`);
// });

//fetch nfl data from ESPN


const BASE_API_URL = `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/teams/${teamId}/schedule?season=${season}&seasontype=2`;

/** requests nfl event data (for seahawks in this iteration) and adds events to DB
 * @param
 * @returns
 */

async function requestSeahawksEvents() {
  //TODO: put this in the model and just feed sport team name and sport
  const teamId: number = 26;
  const season: number = 2024;
  const sport: string = "football";
  const league: string = "nfl";

  const data = await fetch(BASE_API_URL);

  //TODO: add to DB
  const nflEvents = parseNFLData(data);

  for (let event of nflEvents) {
    TrafficEvent.create(event); //FIXME: fix the type
  }


}

function requestMarinersEvents() {

}

function requestKrakenEvents() {

}


await fetch(BASE_API_URL, {
  // The URL of the proxy server
  proxy: "https://username:password@proxy.example.com:8080",
});


import type { espnAPIData, espnEvent, espnEvents, EspnNFLEvent, tTrafficEvent } from "../types.ts";
/**
Given NFL schedule data that looks like seahawks.json
Returns a list of events that are home games ("@ SEA" within shortName)
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
//FIXME: fix teh espnEvent type
function parseNFLData(nflData: espnAPIData): espnEvent[] {
  console.log("parseNFLData");

  const nflEvents: espnEvent[] = [];

  const eventData: EspnNFLEvent[] = nflData.events; //original event data from espn api

  for (const event of eventData) {
    const { name, date, shortName, competitions } = event;
    const startDate = date;
    const statusValue = competitions[0].status.type.name;
    const statusCompleted = competitions[0].status.type.completed;
    const venue = competitions[0].venue.fullName;
    const zipcode = competitions[0].venue.address.zipCode;

    if (shortName.includes("@ SEA")) {
      nflEvents.push({
        name,
        startDate,
        shortName,
        statusValue,
        statusCompleted,
        venue,
        zipcode
      });
    }
  }

  return nflEvents;
}

// test
// https://bun.sh/guides/read-file/json

// const path = "../data/seahawks.json";
// const file = Bun.file(path);
// const contents = await file.json();

// console.log(parseNFLData(contents));

export { parseNFLData };

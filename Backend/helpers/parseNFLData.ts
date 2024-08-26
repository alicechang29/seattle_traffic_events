import type { espnAPIData, espnEvents } from "../types.ts";
/**
Given NFL schedule data that looks like seahawks.json
Returns a list of events that are home games ("@ SEA" within shortName)
  [{
    name: "Denver Broncos at Seattle Seahawks",
    date: "2024-09-08T20:05Z",
    shortName: "DEN @ SEA",
    status: {
      id: "1",
      name: "STATUS_SCHEDULED",
      state: "pre",
      completed: false,
      description: "Scheduled",
      detail: "Sun, September 8th at 4:05 PM EDT",
      shortDetail: "9/8 - 4:05 PM EDT",
    }
  },...
]
*/

function parseNFLData(nflData: espnAPIData): espnEvents {
  console.log("parseNFLData");

  const nflEvents: espnEvents = [];

  const eventData = nflData.events;

  for (const event of eventData) {
    const { name, date, shortName, competitions } = event;
    const status = competitions[0].status.type;

    if (shortName.includes("@ SEA")) {
      nflEvents.push({ name, date, shortName, status });
    }
  }

  return nflEvents;
}

// test
// https://bun.sh/guides/read-file/json

const path = "../data/seahawks.json";
const file = Bun.file(path);
const contents = await file.json();

console.log(parseNFLData(contents));

export { parseNFLData };

import { describe, test, expect } from "vitest";
import { parseNFLData } from "./parseNFLData";

const path = "./data/seahawks.json";
const file = Bun.file(path);
const contents = await file.json();

describe("parseNFLData", function () {

  test("returns object with correctly parsed data types", function () {
    const parsedNFLData = parseNFLData(contents);

    expect(parsedNFLData).toEqual(
      [
        {
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
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "Miami Dolphins at Seattle Seahawks",
          date: "2024-09-22T20:05Z",
          shortName: "MIA @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, September 22nd at 4:05 PM EDT",
            shortDetail: "9/22 - 4:05 PM EDT",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "New York Giants at Seattle Seahawks",
          date: "2024-10-06T20:25Z",
          shortName: "NYG @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, October 6th at 4:25 PM EDT",
            shortDetail: "10/6 - 4:25 PM EDT",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "San Francisco 49ers at Seattle Seahawks",
          date: "2024-10-11T00:15Z",
          shortName: "SF @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Thu, October 10th at 8:15 PM EDT",
            shortDetail: "10/10 - 8:15 PM EDT",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "Buffalo Bills at Seattle Seahawks",
          date: "2024-10-27T20:05Z",
          shortName: "BUF @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, October 27th at 4:05 PM EDT",
            shortDetail: "10/27 - 4:05 PM EDT",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "Los Angeles Rams at Seattle Seahawks",
          date: "2024-11-03T21:25Z",
          shortName: "LAR @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, November 3rd at 4:25 PM EST",
            shortDetail: "11/3 - 4:25 PM EST",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "Arizona Cardinals at Seattle Seahawks",
          date: "2024-11-24T21:25Z",
          shortName: "ARI @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, November 24th at 4:25 PM EST",
            shortDetail: "11/24 - 4:25 PM EST",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "Green Bay Packers at Seattle Seahawks",
          date: "2024-12-16T01:20Z",
          shortName: "GB @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, December 15th at 8:20 PM EST",
            shortDetail: "12/15 - 8:20 PM EST",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }, {
          name: "Minnesota Vikings at Seattle Seahawks",
          date: "2024-12-22T21:05Z",
          shortName: "MIN @ SEA",
          status: {
            id: "1",
            name: "STATUS_SCHEDULED",
            state: "pre",
            completed: false,
            description: "Scheduled",
            detail: "Sun, December 22nd at 4:05 PM EST",
            shortDetail: "12/22 - 4:05 PM EST",
          },
          venue: {
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
              zipCode: "98134",
            },
          },
        }
      ]
    );

  });

  test("data input matches interface", function () {
    //TBD
    //loop through each key in contents
    //check if the key-value matches interface
    // Write this more efficiently...
    //expect(typeof sampleUser.id).toBe('number');
    //expect(typeof sampleUser.name).toBe('string');
  });
});
import db from "../db.ts";
import { BadRequestError, NotFoundError } from "../expressError.ts";
import type { espnEvent } from "../types.ts";
import { sqlForPartialUpdate } from "../helpers/sqlForPartialUpdate.ts";
export class TrafficEvent {

  /**Create an event (from data), update db, return new event data.
   *
   * Data should be {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
   *
   * Returns {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
  */
  static async create(
    { name,
      startDate,
      shortName,
      statusValue,
      statusCompleted,
      venue,
      zipcode,
    }: espnEvent) {

    console.log("models/TrafficEvent/create");

    const duplicateCheck = await db.query(`
        SELECT id, name, start_date
        FROM traffic_events
        WHERE name = $1 AND start_date = $2`, [name, startDate]);

    //TODO: check if this is returning an ID
    if (duplicateCheck.rows[0]) {
      const dupeEvent = duplicateCheck.rows[0];
      throw new BadRequestError(`${dupeEvent.id}`);
    }

    const result = await db.query(`
                INSERT INTO traffic_events (
                name,
                start_date,
                short_name,
                status_value,
                status_completed,
                venue,
                zipcode)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING
                    id,
                    name,
                    start_date AS startDate,
                    end_date AS endDate,
                    short_name AS shortName,
                    status,
                    venue,
                    zipcode`, [
      name, startDate, shortName, statusValue, statusCompleted, venue, zipcode
    ],
    );
    const trafficEvent = result.rows[0];

    return trafficEvent;
  }
  /**Gets all events.
    * Returns [{name,startDate,shortName,statusValue,statusCompleted,venue,zipcode},...]
   */
  static async getEvents() {
    console.log("models/TrafficEvent/getEvents");
    const result = await db.query(`
      SELECT id,
              name,
              start_date AS startDate,
              short_name AS shortName,
              status_value AS statusValue,
              status_completed AS statusCompleted,
              venue,
              zipcode
      FROM traffic_events`
    );

    return result.rows;
  }

  /**Gets all events that have a status of scheduled or in progress.
   *
   * Returns [{name,startDate,shortName,statusValue,statusCompleted,venue,zipcode},...]
  */
  static async getScheduledInProgressEvents() {
    console.log("models/TrafficEvent/getScheduledInProgressEvents");

    const result = await db.query(`
      SELECT id,
              name,
              start_date AS startDate,
              short_name AS shortName,
              status_value AS statusValue,
              status_completed AS statusCompleted,
              venue,
              zipcode
      FROM traffic_events
      WHERE status_value IN ($1, $2)`, ['STATUS_SCHEDULED', 'STATUS_IN_PROGRESS']
    );

    return result.rows;
  }

  /**Update event data with 'data'.
   * Data can include {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
   *
   * Returns {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
   *
   * Throws NotFoundError if not found.
   */
  static async updateEvent(eventId: number, data: espnEvent): Promise<any> {
    console.log("updateEvent");
    //FIXME: existing record will have an ID but incoming record will not
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        startDate: "start_date",
        shortName: "short_name",
        statusValue: "status_value",
        statusCompleted: "status_completed",
        venueName: "venue_name"
      }
    );

    const updateSqlQuery = `
      UPDATE events
      SET ${setCols}
      WHERE id = ${eventId}
    `;
  }
}


console.log("GET EVENTS", await TrafficEvent.getEvents());
console.log("SCHEDULED EVENTS", await TrafficEvent.getScheduledInProgressEvents());
console.log("Update", await TrafficEvent.updateEvent(1, {
  id: 1,
  name: "Denver Broncos at Seattle Seahawks",
  startdate: "2024-09-08T20:05:00.000Z",
  shortname: "DEN @ SEA",
  statusvalue: "STATUS_COMPLETED",
  statuscompleted: false,
  venue: "Lumen Field",
  zipcode: "98134",
}));
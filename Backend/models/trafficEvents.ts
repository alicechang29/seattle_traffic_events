// import db from "../db.ts";
import { BadRequestError, NotFoundError } from "../expressError.ts";
import type { tTrafficEvent } from "../types.ts";

export class TrafficEvent {

  static async create(
    { name,
      startDate,
      endDate,
      shortName,
      statusValue,
      statusComplete,
      venue
    }: tTrafficEvent) {

    console.log("models/TrafficEvent/create");

    const duplicateCheck = await db.query(`
        SELECT name, start_date
        FROM traffic_events
        WHERE name = $1 AND date = $2`, [name, startDate]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate traffic event: ${name} - ${startDate}`);

    const result = await db.query(`
                INSERT INTO traffic_events (
                name,
                start_date,
                end_date,
                short_name,
                status_value,
                status_complete,
                venue_name)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING
                    name,
                    start_date AS startDate,
                    end_date AS endDate,
                    short_name AS shortName,
                    status,
                    venue`, [
      name, startDate, endDate, shortName, statusValue, statusComplete, venue
    ],
    );
    const trafficEvent = result.rows[0];

    return trafficEvent;
  }

  static async getEvents() {
    console.log("models/TrafficEvent/getEvents");
    const result = await db.query(`
      SELECT name,
              start_date AS startDate,
              end_date AS endDate,
              short_name AS shortName,
              status_value AS statusValue,
              status_complete AS statusComplete,
              venue_name AS venue
      FROM traffic_events`
    );

    return result.rows;
  }

  //TODO: update statuses later to be dynamic
  static async getScheduledInProgressEvents() {
    console.log("models/TrafficEvent/getScheduledInProgressEvents");

    const result = await db.query(`
      SELECT name,
              start_date AS startDate,
              end_date AS endDate,
              short_name AS shortName,
              status_value AS statusValue,
              status_complete AS statusComplete,
              venue_name AS venue
      FROM traffic_events
      WHERE status_value IN ($1, $2)`, ['STATUS_SCHEDULED', 'STATUS_IN_PROGRESS']
    );

    return result.rows;
  }
}
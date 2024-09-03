import db from "../db.ts";
import { BadRequestError, NotFoundError } from "../expressError.ts";
import type { tTrafficEvent } from "../types.ts";

export class TrafficEvent {

  static async create({ name, date, shortName, status, venue }: tTrafficEvent) {
    const duplicateCheck = await db.query(`
        SELECT name, date
        FROM traffic_events
        WHERE name = $1 AND date = $2`, [name, date]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate traffic event: ${name} - ${date}`);

    const result = await db.query(`
                INSERT INTO traffic_events (name,
                date,
                shortName,
                status,
                venue)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING
                    name, date, shortName, status, venue`, [
      name, date, shortName, status, venue
    ],
    );
    const trafficEvent = result.rows[0];

    return trafficEvent;
  }
}
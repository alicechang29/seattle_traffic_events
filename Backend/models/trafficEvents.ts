import db from "../db.ts";
import { BadRequestError, NotFoundError } from "../expressError.ts";
import type { espnEvent } from "../types.ts";
import { sqlForPartialUpdate } from "../helpers/sqlQueryConstructors.ts";
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
    }: espnEvent): Promise<any> {

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
  static async getEvents(): Promise<any> {
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
  /** Constructs a WHERE clause for SQL statements.
   * searchQuery = {
   * status = ['STATUS_IN_PROGRESS', 'STATUS_SCHEDULED'],
   * startDate: '2024-09-08',
   * endDate: '2024-10-06' }
   *Outputs: a WHERE clause SQL statement object can be used to query trafficEvents model
    {
      whereStatement: ''status_value' IN ($1, $2) AND 'start_date' BETWEEN $3 AND $4`
      values: ['STATUS_IN_PROGRESS', 'STATUS_SCHEDULED', '2024-09-08', '2024-10-10']
    }
   */
  static constructWhereClause(searchQuery: Record<string, any>) {
    // FIXME: fix the type of searchQuery
    const keys = Object.keys(searchQuery);
    const whereClauseInputs: string[] = [];
    const whereValues: string[] = [];

    let i = 0;
    let j = 1;

    while (i < keys.length) {
      if (searchQuery.status.length > 0) {
        //status would come as an array
        let statusIndexes: string[] = [];
        for (let statusValue of searchQuery.status) {
          statusIndexes.push(`$${j}`);
          whereValues.push(statusValue);
          j++;
        }
        const statusStatement = `status_value IN (` + statusIndexes.join(", ") + ')';
        whereClauseInputs.push(statusStatement);
        i++;
      }
      // TODO: add back endDate into the route - today = +1day

      if (searchQuery.startDate.length > 0) {
        whereClauseInputs.push(`start_date BETWEEN $${j}`);
        whereValues.push(searchQuery.startDate);
        j++;
        i++;
      }

      if (searchQuery.endDate.length > 0) {
        whereClauseInputs.push(`$${j}`);
        whereValues.push(searchQuery.endDate);
        j++;
        i++;
      }
    }
    const whereStatement: string = whereClauseInputs.join(" AND ");

    return {
      whereStatement,
      values: whereValues
    };

  }

  /**Gets all events by status
   * Allowed status values: 'STATUS_SCHEDULED', 'STATUS_IN_PROGRESS', 'STATUS_COMPLETED'
   * Returns [{name,startDate,shortName,statusValue,statusCompleted,venue,zipcode},...]
  */
  static async getEventsByStatusAndDates({ whereStatement, values }): Promise<any> {
    // FIXME: not sure how declare the type here

    console.log("models/TrafficEvent/getEventsByStatusAndDates");
    //FIXME: add in constructing where clause bc status is now going to be an array

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
      WHERE ${whereStatement}
      ORDER BY start_date`,
      values
    );

    if (result.rows.length === 0) throw new NotFoundError("No events found.");

    return result.rows;
  }

  /**Find event by name and date
   * Returns {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
   * or throws error
   * Used for syncing new ESPN data with existing DB records
   */
  static async findEventByNameAndDate(name: string, startDate: Date): Promise<any> {
    console.log("models/TrafficEvent/findEventByNameAndDate");
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
        WHERE name = $1 AND start_date = $2`, [name, startDate]);

    const event = result.rows[0];

    if (!event) {
      throw new NotFoundError(`No event named: ${name} starting on ${startDate}`);
    }

    return event;
  }


  /**Update event data with 'data'.
   * Data can include {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
   *
   * Returns {name,startDate,shortName,statusValue,statusCompleted,venue,zipcode}
   *
   * Throws NotFoundError if not found.
   */
  static async updateEvent(eventId: number, data: espnEvent): Promise<any> {
    console.log("models/trafficEvents/updateEvent");

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        name: "name",
        startDate: "start_date",
        shortName: "short_name",
        statusValue: "status_value",
        statusCompleted: "status_completed",
        venue: "venue",
        zipcode: "zipcode"
      }
    );
    const eventIdVarIdx = "$" + (values.length + 1);

    const sqlQuery = `
      UPDATE traffic_events
      SET ${setCols}
      WHERE id = ${eventIdVarIdx}
      RETURNING name, start_date AS "startDate", short_name AS "shortName",
              status_value AS "statusValue", status_completed AS "statusCompleted",
              venue, zipcode
    `;
    const result = await db.query(sqlQuery, [...values, eventId]);

    const event = result.rows[0];

    if (!event) {
      throw new NotFoundError(`No event found with id: ${eventId}`);
    }

    return event;
  }
}


// console.log("GET EVENTS", await TrafficEvent.getEvents());
// console.log("find by name and date", await TrafficEvent.findEventByNameAndDate("chicken", new Date("2024-09-08T13:05:00-07:00")));

const searchQuery = {
  status: ['STATUS_SCHEDULED'],
  startDate: '2024-09-08',
  endDate: '2024-11-30'
};

const constructedWhere = TrafficEvent.constructWhereClause(searchQuery);
// console.log("!!constructedWhere", constructedWhere);
console.log(await TrafficEvent.getEventsByStatusAndDates(constructedWhere));
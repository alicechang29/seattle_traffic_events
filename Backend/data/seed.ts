import { getDatabaseUri } from "../config/config.ts";
import db from "../db.ts";

const path = "./seedData.json";
const file = Bun.file(path);
const contents = await file.json();
console.log(contents);

const seedDb = async () => {
  try {


    for (const location of contents.locations) {
      await db.query(
        'INSERT INTO locations (venue, zipcode, lat, long) VALUES ($1, $2, $3, $4) ON CONFLICT (venue) DO NOTHING',
        [location.venue, location.zipcode, location.lat, location.long]
      );
    }

    for (const event of contents.traffic_events) {
      await db.query(
        `INSERT INTO traffic_events
       (name, start_date, short_name, status_value, status_completed, venue, zipcode)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [event.name, event.start_date, event.short_name, event.status_value, event.status_completed, event.venue, event.zipcode]
      );
    }

    console.log("DB seeded successfully");

  } catch (e) {
    console.error("Error seeding db", e);
  }

};

seedDb();
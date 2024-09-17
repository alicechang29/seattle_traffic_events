# Seattle Traffic Events

## Problem

Without knowing when game days are, commuters are left surprised by heavier than usual traffic delays.
The purpose of this app is to alert users to upcoming events in the Seattle area, helping them plan ahead.

## Features

(WIP as of 9/16/24)

Users can input:

- starting location
- ending destination
- travel date and time
- expected arrival time

App can:

- recommend how much extra travel time users should allocate based on events traffic
- display upcoming events in today, 3 day, 1 week format

## Tech Stack

- Typescript
- Bun.sh
- Express
- PostgreSQL
- React

## Installation

1. Start server: `bun run dev`

2. Start server mode: `bun server.ts`

3. Setup DB:

   1. Create DB: `createdb seattle_traffic_events`
   2. Run: `psql -f Backend/data/schema.sql seattle_traffic_events`
   3. Seed DB: `bun run Backend/data/seed.ts`

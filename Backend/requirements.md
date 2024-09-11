## Reminders

Install Package:

```shell
# installs package
bun add express

# make the type errors go away for TS
bun add -d @types/express
```

Run a file:
`bun run parseNFLData.ts`

## API Endpoints Flow

Fetching new data from ESPN probably only happens 1x a season.
Updating data from ESPN on existing records should happen everyday.

FIXME: Sync Data:

1. Fetch data from ESPN
2. Try to get the event id (search by name/date)
3. If event exists, update full record in DB
4. Else create a new record in DB

Querying DB:

1. Query DB by dates
2. Return results

#### Next steps:

START HERE

- Handle data updates
- Setup DB
- GET events data
- POST new events data
- Remove service layer

Notes:
Well, I have maybe one bit of helpful information - don't think too hard about "service layer" and "controller layer". There are 2 things you want to have as specific, isolated components:

- The data model
- Anything that is for the benefit of the front end (assembling things, formatting, etc)

And any "business logic" that isn't clearly part of those 2 things, goes somewhere else.

things having to do with authentication and authorization are a fuzzy choice, but ideally you rely on the framework for that

But the starting point thing to do is to have your application "filter" out dates which have happened already (e.g. query for things based on date). And if you care about the database getting too big over time, you have something that runs on a schedule and deletes the "old" stuff

if your goal is to have a database of events, with information that matches what is in whatever sources, including updates, then something like that is what you do. Do you remember when we talked about PUT vs PATCH in REST APIs before? A tool that fetched events from someplace and then updated your local database using a REST API is the kind of use case where you use PUT, because you want to make your local record look like the current state of the source record.

---

- add in logic for filterEspnDataByDate helper
- test the route

- change get nfl event to be a post and add to DB
- write test for route
- finish unit test for parseNFLData
- trafficEvent - MODEL

  - decide what fields are needed from status and venue objects (don't want to store as objects)
  - should i have venue as a separate model
  - test the traffic Event create method on the model

#### ON HOLD:

- make the fn more generic in routes, add params

#### Completed Tasks:

- Write a readme
- fix db config
- create a db: seattle_traffic_events / seattle_traffic_events_test
- create api to get the nfl data
- fix issues in routes/trafficEvents
- test the fetch call

- parse seahawks json data to get the data i need

  - events

    - event name: events[i].name
    - date: events[i].date
    - if events[i].shortName contains "@ SEA"
    - event status: events[i].competitions[0].status

    ```json
    "name": "Denver Broncos at Seattle Seahawks",
    "shortName": "DEN @ SEA",
    "date": "2024-09-08T20:05Z",

    "status": {
         "clock": 0,
         "displayClock": "0:00",
         "period": 0,
         "type": {
           "id": "1",
           "name": "STATUS_SCHEDULED",
           "state": "pre",
           "completed": false,
           "description": "Scheduled",
           "detail": "Sun, September 8th at 4:05 PM EDT",
           "shortDetail": "9/8 - 4:05 PM EDT"
         },
         "isTBDFlex": true
       }
    ```

##### status.name values:

- STATUS_SCHEDULED
- STATUS_COMPLETED
- STATUS_IN_PROGRESS

##### status.completed

- true
- false

venue.fullName "YANKEE STADIUM"
venue.address.zipcode

- define TS schema
- fix type errors within app.ts
- add in error handlings
- get data

### References

https://bun.sh/guides/ecosystem/express

### Data Gathering

to find the team i need:

- go to espn site and get the team "nickname" https://www.espn.com/nfl/team/schedule/_/name/sea
- hit this endpoint and replace the nickname: https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${nickname}
- get the team id from ^^
- lookup the schedule with, replacing id: https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}/schedule?season=2024&seasontype=2

I need:

- schedule (date and time)
- weather (bad weather = extra time)
- each day, need to check game status (every hour for canceled, rescheduled)

### P1

Outcomes of P1:

- Pull in data from API and display in a table view
- Unit tests

#### Routes

forward the request to controller functions

- GET
  - today's events
  - next 3 days
  - this week's events
  - this month's events

#### Controllers

get the reqeusted information from the models

#### Services

Interacts with external APi's / DB's
contains business logic and data manipulation logic

#### Views

render the view

#### Data Structure

Event

- Event name
- Start time
- End Time
- Date
- Location (longitude, latitude)

User

- Origin Location
- Desired Arrival Time
-

- Pull in data

- Parse the data

- Render a view and display data in table format:
  - Date
  - Time

### P2 and Beyond

Considerations:

- popularity of event (rivalry)
-

Data:

- MLB
- NHL
- UW
- SU
- Conventions
- Concerts

TBD:

- User accounts?

### P-Later

- Construction work:
  - Bridges
  - I5
  - I90
- Airport

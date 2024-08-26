Next steps:

- finish unit test for parseNFLData
- create api to get the data

Completed Tasks:

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

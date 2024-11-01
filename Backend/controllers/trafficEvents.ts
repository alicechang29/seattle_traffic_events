import { type Request, type Response, type NextFunction } from 'express';
import * as trafficEventsApiService from "../services/trafficEvents.ts";
import { BadRequestError } from '../expressError.ts';
import { filterEspnDataByDate } from '../helpers/filterEspnDataByDate.ts';
import { type espnEvent } from '../types.ts';
import { getEventsByStatusAndDates } from "backend/models/trafficEvents.ts";


//FIXME: this can probably be removed
export const getSeahawksData = async (
  req: Request,
  res: Response,
  startDate: Date): Promise<any> => {

  console.log("controller/getSeahawksData");

  try {
    //call service to get data
    // const data: espnEvent = await trafficEventsApiService.getSeahawksDataFromEspn();

    //TODO: add in the sync function from service

    //FIXME: this shouldn't go here
    // const filteredEventsByDate = filterEspnDataByDate(data, startDate);
    // CALL getEventsByStatusAndDates
    //send data as response
    res.status(200).json({
      success: true,
      // data: filteredEventsByDate
    });

  } catch (e) {
    console.error("Issue with fetching data from service", e);

    throw new BadRequestError();
  }

};


/*
i want to forward my route request to the service
service should fetch data from db
- model --> fetch scheduled/in progress events?
controller does data validation
* Allowed status values: 'STATUS_SCHEDULED', 'STATUS_IN_PROGRESS', 'STATUS_COMPLETED'
TODO: Create a type for allowed status values
*/

export const fetchEventDataByStartDateAndStatus = async (
  req: Request,
  res: Response,
): Promise<any> => {

  //FIXME: the dates would come in the request
  //2024-09-03T18:21:03.531Z --> '2024-09-03'
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  const startDate = new Date(today);
  const endDate = new Date(today);
  endDate.setDate(startDate.getDate() + 1);
  const status = ["STATUS_SCHEDULED", "STATUS_IN_PROGRESS"];

  //call the model

  /*
  START HERE
  1. route should pass in the request (get today's events)
  2. pull out the dates from the request
  3. fetch the event by date and status from the model
  4. return the data to the route

  */
  try {

  } catch (NotFoundError) {

  }


  // console.error("Issue with fetching today's events", e);
  // throw new BadRequestError();




};
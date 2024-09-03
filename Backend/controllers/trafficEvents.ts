import { type Request, type Response, type NextFunction } from 'express';
import * as trafficEventsApiService from "../services/trafficEvents.ts";
import { BadRequestError } from '../expressError.ts';
import { filterEspnDataByDate } from '../helpers/filterEspnDataByDate.ts';
import { type espnEvents } from '../types.ts';

export const fetchSeahawksDataFromEspnApi = async (
  req: Request,
  res: Response,
  startDate: Date,
  endDate: Date): Promise<any> => {

  console.log("controller/fetchSeahawksDataFromEspnApi");

  try {
    //call service to get data
    const data: espnEvents = await trafficEventsApiService.getSeahawksDataFromEspn();

    const filteredEventsByDate = filterEspnDataByDate(data, startDate, endDate);

    //send data as response
    res.status(200).json({
      success: true,
      data: filteredEventsByDate
    });

  } catch (e) {
    console.error("Issue with fetching data from service", e);

    throw new BadRequestError();
  }

};
import type { espnEvent } from "../types";

/** Given pre-fetched data that contains:
 *
 * filter data by start date
 *
 * @param data
 * @param start
 */
function filterEspnDataByDate(data: espnEvent, start: Date) {

  //fetch all events where statusValue != "STATUS_COMPLETED"

}

export { filterEspnDataByDate };
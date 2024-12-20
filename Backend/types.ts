export type ErrorMessage = string;
export type ErrorStatus = number;
export type espnAPIData = Record<string, any>;
export interface espnEvent {
  name: string,
  startDate: Date,
  shortName: string,
  statusValue: string,
  statusCompleted: Boolean,
  venue: string,
  zipcode: string;
}
export interface tTrafficEvent extends espnEvent {
  endDate: Date,
}
export interface EspnNFLEventResponse {
  events: EspnNFLEvent[];
}

export interface EspnNFLEvent {
  id: string;
  date: string;
  name: string;
  shortName: string;
  season: {
    year: number;
    displayName: string;
  };
  competitions: EspnNFLCompetition[];
}
export interface EspnNFLCompetition {
  id: string;
  date: string;
  venue: {
    fullName: string;
    address: {
      city: string;
      state: string;
      zipCode: string;
    };
  };
  status: {
    type: {
      id: string;
      name: string;
      state: string;
      completed: boolean;
      description: string;
      detail: string;
      shortDetail: string;
    };
  };
}


export type WhereStatementParams = {
  whereStatement: string;
  values: string[];
};
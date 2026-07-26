export type BeachStatus = 'open' | 'conditional' | 'closed' | 'unclassified';

export interface Beach {
  name: string;
  status: BeachStatus;
  reason: string;
  species: string;
  county: string;
  wdfwUrl: string;
  lat: number;
  lng: number;
}

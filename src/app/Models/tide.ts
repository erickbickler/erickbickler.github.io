export interface TidePrediction {
  time: Date;
  heightFt: number;
}

export interface TideStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

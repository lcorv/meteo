import { Forecast } from './forecast';

export class Meteo {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

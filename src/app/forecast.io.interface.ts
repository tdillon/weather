export interface ForecastIO {
  latitude: number;
  longitude: number;
  timezone:string;
  offset:number;
  currently:DataPoint;
  hourly:DataBlock
  daily:DataBlock;
}

export interface  DataBlock {
  summary:string;
  icon: string;
  data: Array<DataPoint>;
}

export interface DataPoint {
  time: number;
  summary: string;
  icon:string;
  sunriseTime :number;
  sunsetTime :number;
  moonPhase :number;
  nearestStormDistance:number;
  nearestStormBearing:number;
  precipIntensity:number;
  precipIntensityMax:number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: string;
  precipAccumulation:number;
  temperature :number;
  temperatureMin:number;
  temperatureMinTime:number;
  temperatureMax:number;
  temperatureMaxTime:number;
  apparentTemperature:number;
  apparentTemperatureMin:number;
  apparentTemperatureMinTime:number;
  apparentTemperatureMax:number;
  apparentTemperatureMaxTime:number;
  dewPoint: number;
  windSpeed:number;
  windBearing:number;
  cloudCover:number;
  humidity: number;
  pressure: number;
  visibility: number;
  ozone: number;
}

// For type 0 and 1 - last hour or last day (every data available)
export interface IEveryData {
  internal_temperature: number;
  external_temperature: number;
  humidity: number;
  weight: number;
  solar_panel_voltage: number;
  battery: number;
  reading_date: string;
}

// For type 2 and 3 - last week or last month (daily average)
export interface IDailyData {
  day: string;
  avg_weight: number;
  avg_int_temp: number;
  avg_ext_temp: number;
  avg_humidity: number;
  avg_battery: number;
  avg_spv: number;
  reading_numbers: string;
}

// For type 4 - last year (weekly average)
export interface IWeeklyData {
  week: number;
  avg_weight: number;
  avg_int_temp: number;
  avg_ext_temp: number;
  avg_humidity: number;
  avg_battery: number;
  avg_spv: number;
  reading_numbers: number;
}

export interface IData extends IEveryData, IDailyData, IWeeklyData {}

export interface IHiveData {
  data: IData[];
  lastData: Array<IEveryData>;
}

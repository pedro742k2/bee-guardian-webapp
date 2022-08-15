// For type 0 and 1 - last hour or last day (every data available)
export interface IEveryData {
  internal_temperature: string;
  external_temperature: string;
  humidity: number;
  weight: string;
  solar_panel_voltage: decimal;
  battery: number;
  reading_date: string;
}

// For type 2 and 3 - last week or last month (daily average)
export interface IDailyData {
  day: string;
  avg_weight: string;
  avg_int_temp: string;
  avg_ext_temp: string;
  avg_humidity: string;
  avg_battery: string;
  avg_spv: string;
  reading_numbers: string;
}

// For type 4 - last year (weekly average)
export interface IWeeklyData {
  week: number;
  avg_weight: string;
  avg_int_temp: string;
  avg_ext_temp: string;
  avg_humidity: string;
  avg_battery: string;
  avg_spv: string;
  reading_numbers: string;
}

export interface IHiveData {
  data: Array<IEveryData | IDailyData | IWeeklyData>;
  lastData: Array<IEveryData>;
}

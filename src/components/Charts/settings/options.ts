const generalOptions = {
  tension: 0.5,
  pointRadius: 3,
  pointHoverRadius: 7,
  pointHoverBorderWidth: 3,
};

export const weightOptions = {
  label: "Weight",
  backgroundColor: "#FF3100",
  borderColor: "#9F1F00",

  ...generalOptions,
};

export const intTempOptions = {
  label: "Internal Temperature",
  backgroundColor: "#FF8A00",
  borderColor: "#9F5600",

  ...generalOptions,
};

export const extTempOptions = {
  label: "External Temperature",
  backgroundColor: "#FFC300",
  borderColor: "#9F7A00",

  ...generalOptions,
};

export const humidityOptions = {
  label: "Humidity",
  backgroundColor: "#00EAFF",
  borderColor: "#00929F",

  ...generalOptions,
};

export const batteryOptions = {
  label: "Battery",
  backgroundColor: "#00FF67",
  borderColor: "#009F40",

  ...generalOptions,
};

export const spvOptions = {
  label: "Solar Panel Voltage",
  backgroundColor: "#EDFF00",
  borderColor: "#949F00",

  ...generalOptions,
};

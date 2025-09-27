// utils/convertUnits.js
export function convertTemperature(value, unit) {
  if (unit === "F") {
    return ((value * 9) / 5 + 32).toFixed(0); // no decimals
  }
  return value.toFixed(0); // Celsius
}

export function convertSpeed(value, unit) {
  if (unit === "mph") {
    return (value / 1.609).toFixed(0);
  }
  return value.toFixed(0); // km/h
}

export function convertPrecipitation(value, unit) {
  if (unit === "inches") {
    return (value / 25.4).toFixed(1); // one decimal
  }
  return value.toFixed(1); // mm
}

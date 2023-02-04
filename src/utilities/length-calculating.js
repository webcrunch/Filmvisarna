export function calculatingTime(min) {
  if (min % 60 > 0) {
    return `${Math.floor(min / 60)} timmar och ${min % 60} minuter`;
  } else {
    return `${Math.floor(min / 60)} timmar`;
  }
}

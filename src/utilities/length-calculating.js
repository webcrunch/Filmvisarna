export function calculatingTime(min) {
  return `${Math.floor(min / 60)}:${
    min % 60 > 10 ? min % 60 : String(min % 60).padStart(2, "0")
  } Timmar`;
  // if (min % 60 > 0) {
  //   return `${Math.floor(min / 60)} timmar och ${min % 60} minuter`;
  // } else {
  //   return `${Math.floor(min / 60)} timmar`;
  // }
}

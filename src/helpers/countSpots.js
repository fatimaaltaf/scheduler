import { getAppointmentsForDay } from "helpers/selectors";

export default function countSpots(state, days) {
  
  let resultArr = [];
  for (let day of days) {
    resultArr.push(getAppointmentsForDay(state, day.name)
    .map(i => i.interview !== null ? 0 : 1)
    .reduce((tally, current) => tally + current)
  )}
  return resultArr;
}
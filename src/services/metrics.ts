import type {DecryptedDay} from "@/store/days";
import {days} from "@/store/days";
import {birthControl} from "@/store/birthcontrol";

export function isOnPeriod(): boolean {

  try{
    const lastDay = getLastDay();
    if (lastDay){
      return !lastDay.period_ended;
    }
    return false;
  } catch (e:any){
    return false;
  }
  return false;
}

export function getLastDay(): DecryptedDay|null {
  const sorted = getDaysToConsider();
  if (sorted) {
    return sorted[sorted.length-1];
  }
  return null;
}

export function lastPeriodEndDate(): Date|null{
  const daysToConsider = getDaysToConsider();
  let startDate = null;
  for (let x = 0; x < daysToConsider.length; x++) {
    if (daysToConsider[x].period_ended) {
      startDate = daysToConsider[x].date;
    }
  }
  return startDate;
}

export function estimatedStartDate(): Date|null{
  let lastEnd = lastPeriodEndDate();
  if (!lastEnd){
    return null;
  }

  lastEnd = new Date(lastEnd.getTime());
  if (isOnPeriod()){
    const nextEnd = estimatedEndDate();
    if (!nextEnd){
      return null;
    }
    lastEnd = new Date(nextEnd.getTime());
  }
  for(let x = 0; x < averageTimeBetween(); x++){
    lastEnd.setDate(lastEnd.getDate() + 1);
  }

  if (lastEnd.getTime() < new Date().getTime()){
    return null;
  }
  return lastEnd;
}

export function estimatedEndDate(): Date|null {
  let currentStart = currentPeriodStart();
  if (!currentStart){
    return null;
  }
  currentStart = new Date(currentStart.getTime());
  for(let x = 0; x < averageLength(); x++){
    currentStart.setDate(currentStart.getDate() + 1);
  }

  return currentStart;
}

export function currentPeriodStart(): Date|null {
  const daysToConsider = getDaysToConsider();
  let startDate = null;
  for (let x = 0; x < daysToConsider.length; x++) {
    if (daysToConsider[x].period_ended && x != daysToConsider.length - 1) {
      startDate = daysToConsider[x + 1].date;
    }
  }
  return startDate;
}

export function averageTimeBetween(): number {
  const daysToConsider = getDaysToConsider();
  let total = 0;
  let numPeriodsToIgnore = 0;
  for (let x = 0; x < daysToConsider.length; x++) {
    if (daysToConsider[x].period_ended && x != daysToConsider.length - 1) {
      const endDate = daysToConsider[x].date;
      const nextStart = daysToConsider[x + 1].date;
      const diff = diffBetweenDays(endDate, nextStart);
      if (diff < 60){
        total+=diff;
      } else {
        numPeriodsToIgnore++;
      }
    }
  }

  // Subtract one because we are averaging on the time between periods not number of periods themselves
  return total / (numberOfPeriods() - 1 - numPeriodsToIgnore);
}

export function averageLength(): number {
  const daysToConsider = getDaysToConsider();
  if (daysToConsider.length === 0){
    return 0;
  }
  return daysToConsider.filter((day) => day.on_period).length / numberOfPeriods();
}

export function diffBetweenDays(earlier: Date, later: Date): number {
  return Math.floor(
    (Date.parse(later.toDateString()) - Date.parse(earlier.toDateString())) /
      86400000
  );
}

export function numberOfPeriods(): number {
  const daysToConsider = getDaysToConsider();
  let count = daysToConsider.filter(function (day) {
    return day.period_ended;
  }).length;
  if (!daysToConsider[daysToConsider.length-1].period_ended){
    count++;
  }
  return count;
}

export function getDaysToConsider(): DecryptedDay[] {
  days.load();
  let sorted =  days.decryptedDays.sort(function (a, b) {
    return a.date.getTime() - b.date.getTime();
  });
  // If they're currently on birth control we need to only count days when
  // they're on their current birth control.
  const currentBirthControl = birthControl.getCurrentBirthControl();
  if (currentBirthControl) {
    sorted = sorted.filter((day) => {
      if (
          currentBirthControl.start_date !== undefined &&
          day.date.getTime() < currentBirthControl.start_date.getTime()
      ) {
        return false;
      }
      return true;
    });
  }
  return sorted;
}

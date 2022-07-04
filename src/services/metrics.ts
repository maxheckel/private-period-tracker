import { days } from "@/store/days";
import type { DecryptedDay } from "@/store/days";
import { birthControl } from "@/store/birthcontrol";

export function isOnPeriod(): boolean {
  if (days.getDays().length == 0) {
    return false;
  }
  const lastDay = getLastDay();
  return !lastDay.period_ended;
}

export function getLastDay() {
  return days.getDays().sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
  })[0];
}

export function getFirstDayOfCurrentPeriod() {
  const daysToConsider = getDaysToConsider();
  let couldBeNext = false;
  let currentPeriodStart = daysToConsider[0].date;
  for (let x = 0; x < daysToConsider.length; x++) {
    if (daysToConsider[x].period_ended && x != daysToConsider.length - 1) {
      couldBeNext = true;
    }
    if (couldBeNext && daysToConsider[x].on_period) {
      currentPeriodStart = daysToConsider[x].date;
      couldBeNext = false;
    }
  }
  return currentPeriodStart;
}

export function getLastMonthsDays(): DecryptedDay[] {
  let lastMonthMonth = new Date().getMonth() - 1;
  let lastMonthYear = new Date().getFullYear();
  if (lastMonthMonth == -1) {
    lastMonthMonth = 11;
    lastMonthYear = lastMonthYear - 1;
  }
  return days.getDays().filter(function (day) {
    if (day.date.getMonth() != lastMonthMonth) {
      return false;
    }
    if (day.date.getFullYear() != lastMonthYear) {
      return false;
    }

    return true;
  });
}

export function getThisMonthsDays(): DecryptedDay[] {
  return days.getDays().filter(function (day) {
    if (day.date.getMonth() != new Date().getMonth()) {
      return false;
    }
    return day.date.getFullYear() == new Date().getUTCFullYear();
  });
}

function getDaysToConsider() {
  let sorted = days.getDays().sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
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

export function getAverageDaysBetweenPeriod() {
  const sorted = getDaysToConsider();
  let numPeriods = 0;
  let totalDays = 0;
  for (let x = 0; x < sorted.length; x++) {
    if (sorted[x].period_ended) {
      if (x == sorted.length - 1) {
        break;
      }
      const numDaysToAdd = Math.floor(
        (Date.parse(sorted[x].date.toDateString()) -
          Date.parse(sorted[x + 1].date.toDateString())) /
          86400000
      );
      if (numDaysToAdd > 60) {
        continue;
      }
      totalDays += numDaysToAdd;
      numPeriods++;
    }
  }
  return totalDays / numPeriods;
}

export function getAverageDaysOnPeriod(): number {
  const sorted = getDaysToConsider();
  let currentCount = 0;
  let periodCount = 0;
  let totalDays = 0;
  for (let x = 0; x < sorted.length; x++) {
    if (sorted[x].period_ended) {
      currentCount++;
      totalDays += currentCount;
      periodCount++;
      currentCount = 0;
    }
  }
  return totalDays / periodCount;
}

export function getNextEstimatedPeriodStartDate(): Date|undefined {
  if (days.getDays().length === 0){
    return undefined;
  }
  const averageDaysBetweenPeriod = getAverageDaysBetweenPeriod();
  const lastDay = getLastDay().date;
  lastDay.setDate(lastDay.getDate() + averageDaysBetweenPeriod);
  return lastDay;
}

export function getCurrentEstimatedPeriodEndDate(): Date|undefined {
  if (days.getDays().length === 0){
    return undefined;
  }
  const averageDaysOnPeriod = getAverageDaysOnPeriod();
  const firstDayOfCurrentPeriod = getFirstDayOfCurrentPeriod();
  firstDayOfCurrentPeriod.setDate(
    firstDayOfCurrentPeriod.getDate() + averageDaysOnPeriod
  );
  return firstDayOfCurrentPeriod;
}

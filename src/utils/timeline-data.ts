import { DateTime } from 'luxon'
import {
  getBrazillianDate,
  getBrazillianNow,
  getCurrentBrazillianWeekDays,
} from './timezone'
import { MINUTES_PER_SLOT } from './constants'

export const getFilteredEvents = (
  data: any[],
  day: DateTime,
  teammate?: string
) => {
  const filteredEvents: any[] = []
  data.forEach((event) => {
    const datetimeStart = getBrazillianDate(event.startAt)
    const datetimeEnd = getBrazillianDate(event.endAt)

    if (!teammate) {
      if (day.day === datetimeStart.day || day.day === datetimeEnd.day) {
        return filteredEvents.push(event)
      }
    } else {
      if (
        teammate === event.createdBy.name &&
        (day.day === datetimeStart.day || day.day === datetimeEnd.day)
      )
        return filteredEvents.push(event)
    }
  })

  return filteredEvents
}

export const getFilteredWeekDays = (data: any[], teammate?: string) => {
  const filteredWeekDays = getCurrentBrazillianWeekDays().reduce(
    (acc: { [index: string]: number }, curr) => ((acc[curr.toISO()!] = 0), acc),
    {}
  )

  data.forEach((event) => {
    const datetimeStart = getBrazillianDate(event.startAt)
    const midnightDayISO = datetimeStart.startOf('day').toISO()

    if (!midnightDayISO) return

    if (!teammate) {
      filteredWeekDays[midnightDayISO] += 1
    } else {
      if (event.createdBy.name === teammate) {
        filteredWeekDays[midnightDayISO] += 1
      }
    }
  })

  return filteredWeekDays
}

export const getFilteredTeam = (data: any[]) => {
  const filteredTeam: {
    [index: number]: { id: number; name: string; image: string; total: number }
  } = {}

  data.forEach((event) => {
    if (filteredTeam[event.createdBy.id]) {
      filteredTeam[event.createdBy.id].total += 1
    } else {
      filteredTeam[event.createdBy.id] = { ...event.createdBy, total: 1 }
    }
  })

  return filteredTeam
}

export const findNextAvailableSlot = (data: any[]) => {
  const now = getBrazillianNow()
  let hasEvent = true
  let date = now.set({
    minute: Math.floor(now.minute / MINUTES_PER_SLOT) * MINUTES_PER_SLOT,
    second: 0,
    millisecond: 0,
  })

  do {
    date = date.plus({ minutes: MINUTES_PER_SLOT })
    hasEvent = data.some(
      (event) =>
        getBrazillianDate(event.startAt) <= date &&
        getBrazillianDate(event.endAt) > date
    )
  } while (hasEvent)

  return date
}

export const getTotalSlots = (data: any) => {
  const datetimeStart = getBrazillianDate(data.startAt)
  const datetimeEnd = getBrazillianDate(data.endAt)

  const minutesDiff = datetimeEnd
    .diff(datetimeStart, 'minutes')
    .toObject().minutes

  if (!minutesDiff) return 0
  return minutesDiff / MINUTES_PER_SLOT
}

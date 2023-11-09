import { DateTime } from 'luxon'

export const getBrazillianNow = () => {
  return DateTime.now().setZone('America/Sao_Paulo').setLocale('en')
}

export const getBrazillianDate = (date: string) => {
  return DateTime.fromISO(date, { zone: 'America/Sao_Paulo' }).setLocale('en')
}

export const getCurrentBrazillianWeekDays = () => {
  const startOfWeek = getBrazillianNow().startOf('week')
  const weekDays = []
  for (let i = 0; i < 7; i++) {
    weekDays.push(startOfWeek.plus({ days: i }))
  }
  return weekDays
}

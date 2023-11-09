'use client'

import { Header } from '@/components/header/Header'
import { Menu } from '@/components/menu/Menu'
import { TeamFilter } from '@/components/team-filter/TeamFilter'
import { Timeline } from '@/components/timeline/Timeline'
import { WeekDayFilter } from '@/components/weekday-filter/WeekDayFilter'
import { data } from '@/data/mock'
import { MINUTES_PER_SLOT } from '@/utils/constants'
import {
  findNextAvailableSlot,
  getFilteredEvents,
  getFilteredTeam,
  getFilteredWeekDays,
} from '@/utils/timeline-data'
import { getBrazillianNow } from '@/utils/timezone'
import { randomBytes } from 'crypto'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(getBrazillianNow())
  const [selectedTeammate, setSelectedTeammate] = useState<string>()
  const [updatedData, setUpdatedData] = useState(data)

  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById('now')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
  }, [selectedDay])

  const filteredEvents = useMemo(
    () => getFilteredEvents(updatedData, selectedDay, selectedTeammate),
    [selectedTeammate, selectedDay, updatedData]
  )

  const filteredWeekDays = useMemo(
    () => getFilteredWeekDays(updatedData, selectedTeammate),
    [selectedTeammate, updatedData]
  )

  const filteredTeam = useMemo(
    () => getFilteredTeam(updatedData),
    [updatedData]
  )

  const actionButtonCallback = () => {
    const updatedEvents = updatedData
    const nextAvailableDate = findNextAvailableSlot(updatedEvents)
    const startDateISO = nextAvailableDate.toISO()
    const endDateISO = nextAvailableDate
      .plus({ minutes: 1 * MINUTES_PER_SLOT })
      .toISO()
    if (!startDateISO || !endDateISO) return
    updatedEvents.push({
      id: randomBytes(20).toString('hex'),
      startAt: startDateISO,
      endAt: endDateISO,
      attendee: {
        name: 'Steve',
        image:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      createdBy: {
        id: '45c38609-a121-46c6-8a8b-a2a67f9e0de5',
        name: 'Tania',
        image: '/avatars/tania.png',
      },
    })
    setUpdatedData([...updatedEvents])
    setSelectedDay(getBrazillianNow())
  }

  return (
    <main className='flex h-screen flex-col'>
      <Header date={selectedDay} />
      <WeekDayFilter
        selectedDay={selectedDay}
        days={filteredWeekDays}
        onSelect={(day) => setSelectedDay(day)}
      />
      <TeamFilter
        team={filteredTeam}
        selectedTeammate={selectedTeammate}
        onSelect={(person) =>
          selectedTeammate === person
            ? setSelectedTeammate(undefined)
            : setSelectedTeammate(person)
        }
      />
      <Timeline filteredEvents={filteredEvents} selectedDay={selectedDay} />
      <Menu actionButtonCallback={actionButtonCallback} />
    </main>
  )
}

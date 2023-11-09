import { getBrazillianDate, getBrazillianNow } from '@/utils/timezone'
import { DateTime } from 'luxon'
import { SameDayCard } from './SameDayCard'
import { SplitDayCard } from './SplitDayCard'
import { TimelineBackground } from './TimelineBackground'
import { TimelineNow } from './TimelineNow'
import { UnavailableCard } from './UnavailableCard'

type Timeline = {
  filteredEvents: any
  selectedDay: DateTime
}

export const Timeline = ({ filteredEvents, selectedDay }: Timeline) => {
  const now = getBrazillianNow()
  return (
    <div className='relative overflow-y-auto overflow-x-hidden pb-16 pt-12 scrollbar-hide'>
      {filteredEvents.map((event: any) =>
        event.attendee ? (
          getBrazillianDate(event.startAt).day ===
          getBrazillianDate(event.endAt).day ? (
            <SameDayCard key={`${event.id}-${selectedDay.day}`} event={event} />
          ) : (
            <SplitDayCard
              key={`${event.id}-${selectedDay.day}`}
              event={event}
              selectedDay={selectedDay}
            />
          )
        ) : (
          <UnavailableCard
            key={`${event.id}-${selectedDay.day}`}
            event={event}
            selectedDay={selectedDay}
          />
        )
      )}
      <TimelineBackground selectedDay={selectedDay} />
      {now.day === selectedDay.day ? <TimelineNow /> : null}
    </div>
  )
}

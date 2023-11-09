import { MINUTES_PER_SLOT, SLOT_SIZE_IN_PX } from '@/utils/constants'
import { getTotalSlots } from '@/utils/timeline-data'
import { getBrazillianDate, getBrazillianNow } from '@/utils/timezone'
import { Transition } from '@headlessui/react'
import { DateTime } from 'luxon'
import Image from 'next/image'

type UnavailableCard = {
  event: any
  selectedDay: DateTime
}

export const UnavailableCard = ({ event, selectedDay }: UnavailableCard) => {
  const now = getBrazillianNow()
  const datetimeStart = getBrazillianDate(event.startAt)
  const datetimeEnd = getBrazillianDate(event.endAt)

  const isSameDay = datetimeStart.day === datetimeEnd.day
  const slotsUntilMidnight =
    (datetimeEnd.startOf('day').diff(datetimeStart, 'minutes').toObject()
      .minutes ?? 0) / MINUTES_PER_SLOT
  const slotsAfterMidnight = getTotalSlots(event) - slotsUntilMidnight

  const topOffset =
    !isSameDay && selectedDay.day === datetimeEnd.day
      ? SLOT_SIZE_IN_PX - 25
      : SLOT_SIZE_IN_PX +
        SLOT_SIZE_IN_PX *
          (datetimeStart.hour * 4 + datetimeStart.minute / MINUTES_PER_SLOT)

  const height = isSameDay
    ? getTotalSlots(event) * SLOT_SIZE_IN_PX
    : selectedDay.day === datetimeEnd.day
    ? slotsAfterMidnight * SLOT_SIZE_IN_PX + 25
    : slotsUntilMidnight * SLOT_SIZE_IN_PX + 25

  return (
    <Transition
      id={event.id}
      appear={true}
      show={true}
      enter='transition-transform transition-opacity duration-700'
      enterFrom='opacity-0 translate-x-full'
      enterTo='opacity-100 translate-x-0'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='absolute left-1/4 z-20 flex w-2/3 items-center justify-center rounded-xl bg-blueGray-800/60 bg-[url("/unavailable-bg.png")] bg-[length:100%_auto] bg-repeat-y py-2 pl-4 pr-2 shadow-default'
      style={{
        top: `${topOffset}px`,
        height: `${height}px`,
      }}
    >
      <div className=' flex flex-col items-center justify-center text-xs text-blueGray-400'>
        <span>Unavailable</span>
        {getTotalSlots(event) > 1 ? (
          <span>
            {datetimeStart.toFormat('HH:mm')} - {datetimeEnd.toFormat('HH:mm')}
          </span>
        ) : null}
      </div>
      <Image
        width={25}
        height={25}
        src={event.createdBy.image}
        alt={`${event.createdBy.name} Avatar`}
        className={`absolute left-0 top-1/2 -translate-x-2/3 -translate-y-1/2 ${
          datetimeStart <= now ? 'grayscale' : 'grayscale-0'
        }`}
      />
    </Transition>
  )
}

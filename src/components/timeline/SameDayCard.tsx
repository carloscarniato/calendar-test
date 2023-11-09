import { MINUTES_PER_SLOT, SLOT_SIZE_IN_PX } from '@/utils/constants'
import { getBrazillianDate, getBrazillianNow } from '@/utils/timezone'
import { Transition } from '@headlessui/react'
import { DateTime } from 'luxon'
import { Avatar } from '../common/Avatar'
import { getTotalSlots } from '@/utils/timeline-data'

type SameDayCard = {
  event: any
}

export const SameDayCard = ({ event }: SameDayCard) => {
  const now = getBrazillianNow()
  const datetimeStart = getBrazillianDate(event.startAt)
  const datetimeEnd = getBrazillianDate(event.endAt)

  const topOffset = SLOT_SIZE_IN_PX + SLOT_SIZE_IN_PX * (datetimeStart.hour * 4 + datetimeStart.minute / MINUTES_PER_SLOT)
  const height = getTotalSlots(event) * SLOT_SIZE_IN_PX

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
      className='absolute left-1/4 z-20 flex w-2/3 flex-col justify-between rounded-xl border border-blueGray-700/60 bg-blueGray-800 py-2 pl-4 pr-2 shadow-default'
      style={{
        top: `${topOffset}px`,
        height: `${height}px`,
      }}
    >
      <div
        className={`flex flex-col ${
          datetimeStart <= now
            ? 'text-blueGray-300 grayscale'
            : 'text-white grayscale-0'
        }`}
      >
        <div className='flex items-center justify-between'>
          <span className='text-sm'>{event.attendee.name}</span>
          <Avatar src={event.attendee.image} width={32} height={32} />
        </div>
        {
          getTotalSlots(event) > 1 ? (
            <span className='text-xs'>
              {datetimeStart.toFormat('HH:mm')} -{' '}
              {datetimeEnd.toFormat('HH:mm')}
            </span>
          ) : null
        }
      </div>
      <div
        className={`absolute left-0 top-1/2 -translate-x-2/3 -translate-y-1/2 ${
          datetimeStart <= now ? 'grayscale' : 'grayscale-0'
        }`}
      >
        <Avatar src={event.createdBy.image} width={25} height={25} />
      </div>
    </Transition>
  )
}

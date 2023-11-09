import { Transition } from '@headlessui/react'
import { DateTime } from 'luxon'

type TimelineBackground = {
  selectedDay: DateTime
}

export const TimelineBackground = ({ selectedDay }: TimelineBackground) => {
  return (
    <Transition
      key={selectedDay.day}
      appear={true}
      show={true}
      enter='transition-opacity duration-700'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='relative z-10'
    >
      {Array.from(Array(24 * 4 + 1).keys()).map((i) => (
        <div key={i} className='relative h-12 border-t border-blueGray-800'>
          {i % 4 === 0 ? (
            <span className='absolute left-6 -translate-y-1/2 bg-blueGray-900 px-2 text-xs text-blueGray-500'>
              {i / 4 === 0
                ? '12 AM'
                : i / 4 < 12
                ? `${i / 4} AM`
                : i / 4 === 12
                ? '12 PM'
                : i / 4 < 24
                ? `${i / 4 - 12} PM`
                : '12AM...'}
            </span>
          ) : null}
        </div>
      ))}
    </Transition>
  )
}

import { getBrazillianDate, getBrazillianNow } from '@/utils/timezone'
import { Transition } from '@headlessui/react'
import { DateTime } from 'luxon'

type WeekDayFilter = {
  days: { [index: string]: number }
  selectedDay: DateTime
  onSelect?: (day: DateTime) => void
}

export const WeekDayFilter = ({
  days,
  selectedDay,
  onSelect,
}: WeekDayFilter) => {
  return (
    <div className='flex justify-center gap-1 border-b border-blueGray-700/30 bg-blueGray-800 pb-4'>
      {Object.keys(days).map((day) => {
        const datetime = getBrazillianDate(day)
        const now = getBrazillianNow()
        return (
          <Transition
            key={day}
            appear={true}
            show={true}
            enter='transition-opacity duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='flex flex-col items-center gap-2'>
              <span className='text-xs text-blueGray-400'>
                {datetime.weekdayShort}
              </span>
              <div className='relative'>
                <button
                  className={`h-12 w-12 rounded-xl transition-all duration-300  ${
                    now.day === datetime.day ? 'bg-blueGray-700' : ''
                  } ${
                    selectedDay.day === datetime.day
                      ? 'bg-white text-black'
                      : ''
                  }`}
                  onClick={() => (onSelect ? onSelect(datetime) : null)}
                >
                  {datetime.day}
                </button>
                {days[day] > 0 ? (
                  <span
                    className={`absolute z-10 flex items-center  justify-center rounded-full bg-primaryBlue text-xxs transition-all duration-300 ${
                      selectedDay.day === datetime.day
                        ? '-right-1 -top-1 h-4 w-4'
                        : 'right-1 top-1 h-2 w-2'
                    } `}
                  >
                    {selectedDay.day === datetime.day ? days[day] : ''}
                  </span>
                ) : null}
              </div>
            </div>
          </Transition>
        )
      })}
    </div>
  )
}

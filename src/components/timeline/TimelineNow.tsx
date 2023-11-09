import { MINUTES_PER_SLOT, SLOT_SIZE_IN_PX } from '@/utils/constants'
import { getBrazillianNow } from '@/utils/timezone'
import { Transition } from '@headlessui/react'
import Image from 'next/image'

export const TimelineNow = () => {
  const now = getBrazillianNow()
  const nextSlotMinutes = now.set({
    minute:
      Math.floor(now.minute / MINUTES_PER_SLOT) * MINUTES_PER_SLOT +
      MINUTES_PER_SLOT,
    second: 0,
    millisecond: 0,
  })
  const topOffset =
    (nextSlotMinutes.hour * 4 + nextSlotMinutes.minute / MINUTES_PER_SLOT) *
      SLOT_SIZE_IN_PX +
    SLOT_SIZE_IN_PX

  return (
    <Transition
      appear={true}
      show={true}
      enter='transition-transform duration-700'
      enterFrom='-translate-x-full'
      enterTo='translate-x-0'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='absolute z-30 w-full border-t border-white'
      id='now'
      style={{
        top: `${topOffset}px`,
      }}
    >
      <div className='absolute left-6 -translate-y-1/2 rounded-lg bg-white px-2 py-1 text-xs text-black'>
        <span>{nextSlotMinutes.toFormat('HH:mm')}</span>
        <Image
          width={7}
          height={3}
          src='/icons/right-arrow.svg'
          alt='Right Arrow Icon'
          className='absolute -right-1.5 top-1'
        />
      </div>
    </Transition>
  )
}

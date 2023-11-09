import { Transition } from '@headlessui/react'
import { DateTime } from 'luxon'

type Header = {
  date: DateTime
}

export const Header = ({ date }: Header) => {
  return (
    <header className='bg-blueGray-800'>
      <Transition
        appear={true}
        show={true}
        enter='transition-transform transition-opacity duration-300'
        enterFrom='opacity-0 -translate-y-full'
        enterTo='opacity-100 translate-y-0'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='flex items-center justify-between bg-blueGray-800 px-6 py-3 '
      >
        <div className='flex h-12 items-center'>
          <h2>
            <span className='font-medium'>{date.toFormat('MMMM dd, ')}</span>
            <span className='font-light'>{date.toFormat('yyyy')}</span>
          </h2>
        </div>
        <div className='flex flex-col text-right'>
          <span className='text-xs text-blueGray-400'>Timezone: Brazil</span>
          <span className='text-xs text-blueGray-400'>Logged as: Tania</span>
        </div>
      </Transition>
    </header>
  )
}

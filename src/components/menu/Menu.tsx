import { Transition } from '@headlessui/react'
import { ActionButton } from '../common/ActionButton'
import { MenuItem } from './MenuItem'

const items = [
  {
    name: 'Home',
    icon: '/icons/home.svg',
  },
  {
    name: 'Calendar',
    icon: '/icons/calendar.svg',
  },
  {
    name: 'Shop',
    icon: '/icons/shop.svg',
  },
  {
    name: 'Message',
    icon: '/icons/message.svg',
  },
  {
    name: 'More',
    icon: '/icons/more.svg',
  },
]

type Menu = {
  actionButtonCallback: () => void
}

export const Menu = ({ actionButtonCallback }: Menu) => {
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full'>
      <Transition
        appear={true}
        show={true}
        enter='transition-transform transition-opacity duration-300'
        enterFrom='opacity-0 translate-x-full'
        enterTo='opacity-100 translate-x-0'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='absolute bottom-6 right-6'>
          <ActionButton onClick={actionButtonCallback} />
        </div>
      </Transition>
      <Transition
        appear={true}
        show={true}
        enter='transition-transform transition-opacity duration-700'
        enterFrom='opacity-0 translate-y-full'
        enterTo='opacity-100 translate-y-0'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='flex h-16 w-full items-center border-t border-blueGray-700/30 bg-blueGray-800/95 backdrop-blur lg:static lg:h-auto lg:w-auto lg:bg-none'>
          {items.map((item) => (
            <MenuItem key={item.name} name={item.name} icon={item.icon} />
          ))}
        </div>
      </Transition>
    </div>
  )
}

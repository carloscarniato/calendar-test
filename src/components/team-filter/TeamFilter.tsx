import { Transition } from '@headlessui/react'
import { Avatar } from '../common/Avatar'

type TeamFilter = {
  team: {
    [index: number]: {
      id: number
      name: string
      image: string
      total: number
    }
  }
  selectedTeammate?: string
  onSelect: (person: string) => void
}

export const TeamFilter = ({
  team,
  selectedTeammate,
  onSelect,
}: TeamFilter) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter='transition-opacity duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div
        className={`flex snap-x snap-mandatory scroll-smooth border-b border-blueGray-700/30 bg-blueGray-800 shadow-default ${
          !selectedTeammate
            ? 'justify-center overflow-x-auto'
            : 'overflow-x-hidden'
        } `}
      >
        <div
          className={`flex flex-shrink-0 ${selectedTeammate ? 'px-[50%]' : ''}`}
        >
          {Object.values(team).map((member, i) => (
            <button
              key={i}
              className={`flex flex-shrink-0 items-center gap-2 p-2 transition-all duration-300 ${
                selectedTeammate === member.name
                  ? 'snap-center bg-blueGray-900 px-4'
                  : ''
              }`}
              onClick={() => onSelect(member.name)}
            >
              <div className='relative'>
                <Avatar src={member.image} width={40} height={40} />
                <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blueGray-800 text-xxs'>
                  {member.total}
                </span>
              </div>
              <span
                className={`font-semibold ${
                  selectedTeammate === member.name ? 'block' : 'hidden'
                }`}
              >
                {member.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Transition>
  )
}

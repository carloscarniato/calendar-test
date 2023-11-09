import Image from 'next/image'
import { useState } from 'react'

type ActionButton = {
  onClick: () => void
}

export const ActionButton = ({ onClick }: ActionButton) => {
  const [transition, setTransition] = useState(false)
  return (
    <button
      className={`${
        transition ? 'scale-150' : 'scale-100'
      } rounded-full bg-primaryBlue p-4 duration-75`}
      onClick={() => {
        setTransition(true)
        onClick()
      }}
      onTransitionEnd={() => setTransition(false)}
    >
      <Image width={24} height={24} src='/icons/add.svg' alt='Add Icon' />
    </button>
  )
}

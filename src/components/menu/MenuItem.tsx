import Image from 'next/image'

type MenuItem = {
  name: string
  icon: string
}

export const MenuItem = ({ name, icon }: MenuItem) => {
  return (
    <button className='flex w-1/5 flex-col items-center justify-center'>
      <Image width={24} height={24} src={icon} alt={`${name} Icon`} />
    </button>
  )
}

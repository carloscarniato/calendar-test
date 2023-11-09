import Image from 'next/image'

type Avatar = {
  src: string
  width: number
  height: number
}

export const Avatar = ({ src, width, height }: Avatar) => {
  return (
    <div
      className='relative flex'
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        fill
        src={src}
        alt='Avatar'
        style={{
          objectFit: 'cover',
        }}
        className='rounded-full'
      />
    </div>
  )
}

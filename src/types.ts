export type Event = {
  id: string
  startAt: string
  endAt: string
  attendee: {
    name: string
    image: string
  } | null
  createdBy: {
    id: string
    name: string
    image: string
  }
}

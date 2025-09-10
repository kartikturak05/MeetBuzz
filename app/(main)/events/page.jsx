import { getUserEvent } from "@/actions/events"
import EventCard from "@/components/event-card";
import { Suspense } from "react"

export default function EventsPage(){
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-xl ">
       Loading Events...
    </div>}>
    <Events />
    </Suspense>
  )
}

const Events = async() => {

  const { events,username } = await getUserEvent();
  
  if(events.length == 0){
    return <p>You haven&npos;t created any events yet</p>
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events.map((event)=> (
        <EventCard key={event.id} event={event} username={username}/>
      ))}
    </div>
  )
}
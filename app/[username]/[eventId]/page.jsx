import { getEventAvailability, getEventDetails } from "@/actions/events";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";

export async function generateMetadata({ params }) {
    const { username, eventId } = await params;
  const event = await getEventDetails(username, eventId);
  if (!event) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | MeetBuzz`,
    description: `Schedule a ${event.duration}-minutes ${event.title} event with ${event.user.name}.`,
  };
}

const EventPage = async ({ params }) => {
    const { username, eventId } = await params;
  const event = await getEventDetails(username, eventId);
  const availability = await getEventAvailability(eventId);

  console.log(username)
  console.log(eventId);
  console.log(availability);

  if (!event) {
    notFound();
  }

  return <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
    <EventDetails event={event}/>
     <Suspense fallback={<div>Loading Booking Form...</div>}>
        <BookingForm event={event} availability={availability}/>
    </Suspense>
  </div>;
};

export default EventPage;

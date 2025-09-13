import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";
import { getUpcomingMeetings } from "@/actions/meetings";

export const metadata = {
  title: "Meetings | MeetBuzz",
  description: "Manage your meetings and bookings with MeetBuzz.",
};

async function UpcomingMeetings(){
    const meetings = await getUpcomingMeetings("upcoming");
    return <MeetingList meetings={meetings} type="upcoming"/>
}

async function PastMeetings(){
    const meetings = await getUpcomingMeetings("past");
    return <MeetingList meetings={meetings} type="past"/>   
}

const MeetingPage = () => {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <UpcomingMeetings/>
      </TabsContent>
      <TabsContent value="past">
        <PastMeetings/>
      </TabsContent>
    </Tabs>
  );
};



export default MeetingPage;

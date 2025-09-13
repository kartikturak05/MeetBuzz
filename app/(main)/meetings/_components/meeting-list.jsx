import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns/format";
import { Calendar, Clock, Video } from "lucide-react";
import React from "react";

const MeetingList = ({ meetings, type }) => {
  if (meetings.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-4">
        {type === "upcoming" ? "No upcoming meetings." : "No past meetings."}
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => {
        return (
          <Card key={meeting.id} className="flex flex-col justify-between mb-4">
            <CardHeader>
              <CardTitle>{meeting.event.title}</CardTitle>
              <CardDescription>with {meeting.name}</CardDescription>
              <CardDescription>
                &quot;{meeting.additionalInfo}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(meeting.startTime), "MMMM d,    yyyy")}
                </span>
              </div>

              <div className="flex items-center mb-2">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                  {format(new Date(meeting.endTime), "h:mm a")}
                </span>
              </div>

              {meeting.meetLink && (
                <div className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  <a
                    href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="destructive">
                Cancel Meeting
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default MeetingList;

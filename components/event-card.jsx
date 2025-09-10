"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Dessert, Link, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EventCard = ({ event, username, isPublic = false }) => {
    const [isCopied,setIsCopied] = useState(false);
    const router = useRouter();

    const handleCopy = async() => {
        try { 
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
            setIsCopied(true);
            setTimeout(()=> setIsCopied(false),2000);
        } catch (error) {
            console.log('failed to copy',error)
        }
    }
  return (
    <div>
      <Card className="flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>
              {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
            </span>
            <span>{event._count.bookings} Bookings</span>
          </CardDescription>
          <CardAction>{event.action}</CardAction>
        </CardHeader>
        <CardContent>
          <p>
            {event.description.substring(0, 60)}...
          </p>
        </CardContent>
        {!isPublic && (
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex items-center" onClick={handleCopy}><Link className="mr-2 h-4 w-4"/> {isCopied ? 'Copied' : 'Copy Link'}</Button>
            <Button variant="destructive"> <Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default EventCard;

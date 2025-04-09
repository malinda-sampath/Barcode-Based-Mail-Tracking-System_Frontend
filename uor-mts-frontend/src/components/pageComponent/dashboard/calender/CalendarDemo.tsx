"use client";
import * as React from "react";
import { Calendar } from "../../../ui/calendar";
import { isSameDay } from "date-fns";

interface MailEvent {
  date: Date;
  title: string;
  status: "pending" | "claimed" | "pickup";
}

interface CalendarDemoProps {
  mailEvents: MailEvent[];
}

export function CalendarDemo({ mailEvents }: CalendarDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    return mailEvents.filter((event) => isSameDay(event.date, day));
  };

  return (
    <div className="space-y-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border rounded-lg shadow-md"
        modifiers={{
          hasEvents: mailEvents.map((event) => event.date),
        }}
        modifiersStyles={{
          hasEvents: {
            borderBottom: "3px solid #2563eb", // Enhanced blue border for days with events
          },
        }}
      />

      {/* Display events for selected date */}
      {date && (
        <div className="mt-6">
          <h3 className="text-base font-semibold mb-3">
            Events on {date.toLocaleDateString()}
          </h3>
          <div className="space-y-3">
            {getEventsForDay(date).length > 0 ? (
              getEventsForDay(date).map((event, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    event.status === "pending"
                      ? "bg-orange-100 text-orange-800 border border-orange-300"
                      : event.status === "claimed"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-green-100 text-green-800 border border-green-300"
                  }`}
                >
                  {event.title}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No events for this day</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

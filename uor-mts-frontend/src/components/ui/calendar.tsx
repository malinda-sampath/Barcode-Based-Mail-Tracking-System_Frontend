"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="w-full max-w-[380px] mx-auto rounded-lg shadow-md border border-gray-300 bg-white">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "flex items-center justify-center p-4 bg-white text-black w-full",
          className
        )}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-6 sm:space-x-6 sm:space-y-0",
          month: "space-y-3",
          caption: "flex justify-center pt-2 relative items-center",
          caption_label: "text-base font-semibold text-gray-800",
          nav: "space-x-2 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 p-0 rounded-full"
          ),
          nav_button_previous: "absolute left-2",
          nav_button_next: "absolute right-2",
          table: "w-full border-collapse space-y-2",
          head_row: "flex",
          head_cell: "text-gray-600 rounded-md w-8 font-medium text-sm",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm text-gray-800 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-300",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-medium text-gray-800 aria-selected:opacity-100 text-sm hover:bg-gray-200 rounded-full"
          ),
          day_selected: "bg-gray-300 text-gray-900 hover:bg-gray-400",
          day_today: "bg-gray-100 text-gray-900 font-bold",
          day_outside: "text-gray-400",
          day_disabled: "text-gray-400 opacity-50",
          day_range_middle:
            "aria-selected:bg-gray-300 aria-selected:text-gray-900",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <ChevronLeft
              className={cn("h-4 w-4 sm:h-5 sm:w-5 text-gray-700", className)}
              {...props}
            />
          ),
          IconRight: ({ className, ...props }) => (
            <ChevronRight
              className={cn("h-4 w-4 sm:h-5 sm:w-5 text-gray-700", className)}
              {...props}
            />
          ),
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

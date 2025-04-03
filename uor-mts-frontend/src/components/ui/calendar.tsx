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
    <div className=" w-full max-w-[280px] mx-auto">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "flex items-center p-3 bg-white text-black w-full",
          className
        )}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-2",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-black",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-6 w-6 bg-white border border-gray-300 text-black hover:bg-gray-200 p-0 opacity-100 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-black rounded-md w-7 font-normal text-[0.8rem]",
          row: "flex w-full mt-1",
          cell: cn(
            "relative p-0 text-center text-sm text-black focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-200",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-7 w-7 p-0 font-normal text-black aria-selected:opacity-100 text-xs sm:text-sm"
          ),
          day_selected: "bg-gray-200 text-black hover:bg-gray-300",
          day_today: "bg-gray-100 text-black",
          day_outside: "text-gray-400",
          day_disabled: "text-gray-400 opacity-50",
          day_range_middle:
            "aria-selected:bg-gray-200 aria-selected:text-black",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <ChevronLeft
              className={cn("h-3 w-3 sm:h-4 sm:w-4 text-black", className)}
              {...props}
            />
          ),
          IconRight: ({ className, ...props }) => (
            <ChevronRight
              className={cn("h-3 w-3 sm:h-4 sm:w-4 text-black", className)}
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

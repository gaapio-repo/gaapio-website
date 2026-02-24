
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "group peer inline-flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-full border-2 border-muted-foreground/30 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-muted-foreground/15",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none relative flex items-center justify-center rounded-full shadow-sm transition-all duration-300 ease-in-out",
        // Unchecked: smaller thumb, muted color
        "data-[state=unchecked]:h-4 data-[state=unchecked]:w-4 data-[state=unchecked]:translate-x-1.5 data-[state=unchecked]:bg-muted-foreground/60",
        // Checked: larger thumb with checkmark, primary-foreground
        "data-[state=checked]:h-6 data-[state=checked]:w-6 data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-primary-foreground",
        // Hover grow effect
        "group-hover:data-[state=unchecked]:h-5 group-hover:data-[state=unchecked]:w-5 group-hover:data-[state=unchecked]:translate-x-1",
        "group-hover:data-[state=checked]:h-7 group-hover:data-[state=checked]:w-7 group-hover:data-[state=checked]:translate-x-[19px]",
        // Press effect
        "group-active:data-[state=unchecked]:h-7 group-active:data-[state=unchecked]:w-7 group-active:data-[state=unchecked]:translate-x-0.5",
        "group-active:data-[state=checked]:h-7 group-active:data-[state=checked]:w-7 group-active:data-[state=checked]:translate-x-[17px]",
      )}
    >
      {/* Checkmark icon for checked state */}
      <svg
        className="h-3.5 w-3.5 text-primary opacity-0 transition-opacity duration-200 data-[state=checked]:opacity-100"
        data-state={props.checked ? "checked" : "unchecked"}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
      </svg>
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

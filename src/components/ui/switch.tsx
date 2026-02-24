
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "group peer relative inline-flex h-5 w-[52px] shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40",
      className
    )}
    {...props}
    ref={ref}
  >
    {/* Thin track bar */}
    <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[14px] rounded-full transition-colors duration-300 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/25" data-state={props.checked !== undefined ? (props.checked ? "checked" : "unchecked") : undefined} />
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none relative z-10 flex items-center justify-center rounded-full bg-background shadow-md ring-1 ring-border/10 transition-all duration-300 ease-in-out",
        // Unchecked
        "data-[state=unchecked]:h-5 data-[state=unchecked]:w-5 data-[state=unchecked]:translate-x-0",
        // Checked
        "data-[state=checked]:h-6 data-[state=checked]:w-6 data-[state=checked]:translate-x-[28px] data-[state=checked]:bg-primary-foreground data-[state=checked]:shadow-lg",
      )}
    >
      <svg
        className="h-3 w-3 text-primary opacity-0 transition-opacity duration-200 data-[state=checked]:opacity-100"
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

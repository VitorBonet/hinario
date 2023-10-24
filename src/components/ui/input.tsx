import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    error?: any;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, title, error, ...props }, ref) => {
    return (
      <div
        data-error={!!error} 
        className="data-[error=true]:text-red-600 data-[error=true]:border-red-600"
      >
        { title ? (
          <span className="text-sm pl-[2px]">{title}</span>
        ) : null }
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <span className="text-xs pl-1 text-red-600">{error}</span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

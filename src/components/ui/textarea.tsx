import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    title?: string;
    error?: any;
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, title, error, ...props }, ref) => {
    return (
      <div
        data-error={!!error} 
        className="data-[error=true]:text-red-600 data-[error=true]:border-red-600"
      >
        { title ? (
          <span className="text-sm pl-[2px]">{title}</span>
        ) : null }
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea"

export { Textarea }

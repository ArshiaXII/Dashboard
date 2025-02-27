"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type PaginationProps = {
  className?: string
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("mx-auto w-full max-w-sm text-sm", className)} {...props} />
})
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props} />
  ),
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground",
          isActive && "bg-secondary text-secondary-foreground",
          className,
        )}
        {...props}
      />
    )
  },
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => {
    return (
      <PaginationLink
        ref={ref}
        className={cn("h-8 w-8 p-0 border-0", className)}
        aria-label="Go to previous page"
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
      </PaginationLink>
    )
  },
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => {
    return (
      <PaginationLink
        ref={ref}
        className={cn("h-8 w-8 p-0 border-0", className)}
        aria-label="Go to next page"
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
      </PaginationLink>
    )
  },
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("h-8 w-8 select-none items-center justify-center rounded-md text-sm font-medium", className)}
      {...props}
    >
      ...
    </span>
  ),
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
}


"use client"

import { useState, useEffect } from "react"
import { Clock, Globe } from "lucide-react"
import { getTimezoneOffset, getUserTimezone } from "@/lib/timezone"

export function TimezoneIndicator() {
  const [timezone, setTimezone] = useState<string>("")
  const [offset, setOffset] = useState<string>("")

  useEffect(() => {
    setTimezone(getUserTimezone())
    setOffset(getTimezoneOffset())
  }, [])

  if (!timezone || !offset) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Globe className="w-3 h-3" />
      <span>Times shown in your local timezone</span>
      <span className="text-muted-foreground/60">({offset})</span>
    </div>
  )
}

export function TimezoneIndicatorCompact() {
  const [offset, setOffset] = useState<string>("")

  useEffect(() => {
    setOffset(getTimezoneOffset())
  }, [])

  if (!offset) {
    return null
  }

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Clock className="w-3 h-3" />
      <span>{offset}</span>
    </div>
  )
}

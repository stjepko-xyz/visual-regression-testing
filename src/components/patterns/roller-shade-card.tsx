import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const PRESETS = [
  // { value: "open", label: "Open", position: 0 },
  { value: "half", label: "Half", position: 50 },
  { value: "closed", label: "Closed", position: 100 },
]

type RollerShadeCardProps = {
  room?: string
  device?: string
  defaultPosition?: number
  onPositionChange?: (position: number) => void
}

function RollerShadeCard({
  room = "Living Room",
  device = "Roller Shades",
  defaultPosition = 50,
  onPositionChange,
}: RollerShadeCardProps) {
  const [position, setPosition] = React.useState(defaultPosition)

  const updatePosition = (next: number) => {
    setPosition(next)
    onPositionChange?.(next)
  }

  const activePreset = PRESETS.find((preset) => preset.position === position)

  return (
    <Card className="w-md max-w-full">
      <CardHeader>
        <CardTitle>{room}</CardTitle>
        <CardDescription>{device}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div
          aria-hidden
          className="relative h-32 overflow-hidden rounded-lg border bg-muted"
        >
          <div
            className="absolute inset-x-0 top-0 bg-muted-foreground transition-[height]"
            style={{ height: `${position}%` }}
          />
        </div>
        <div className="flex items-center gap-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          <span>Open</span>
          <Slider
            aria-label="Shade position"
            value={[position]}
            onValueChange={(value) =>
              updatePosition(Array.isArray(value) ? value[0] : value)
            }
          />
          <span>Close</span>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <ToggleGroup
          variant="outline"
          className="w-full"
          value={activePreset ? [activePreset.value] : []}
          onValueChange={(value) => {
            const preset = PRESETS.find((p) => p.value === value[0])
            if (preset) updatePosition(preset.position)
          }}
        >
          {PRESETS.map((preset) => (
            <ToggleGroupItem
              key={preset.value}
              value={preset.value}
              className="flex-1"
            >
              {preset.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}

export { RollerShadeCard }

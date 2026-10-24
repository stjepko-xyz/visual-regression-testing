import type { Meta, StoryObj } from "@storybook/react-vite"

import { RollerShadeCard } from "@/components/patterns/roller-shade-card"

const meta = {
  title: "Patterns/Roller Shade Card",
  component: RollerShadeCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RollerShadeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

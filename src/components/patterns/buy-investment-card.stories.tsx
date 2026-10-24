import type { Meta, StoryObj } from "@storybook/react-vite"

import { BuyInvestmentCard } from "@/components/patterns/buy-investment-card"

const meta = {
  title: "Patterns/Buy Investment Card",
  component: BuyInvestmentCard,
  parameters: { layout: "centered" },
} satisfies Meta<typeof BuyInvestmentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

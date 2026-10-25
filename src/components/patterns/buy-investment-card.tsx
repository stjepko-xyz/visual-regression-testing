import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ORDER_TYPES = [
  {
    value: "market",
    label: "Market Order",
    description: "Market orders execute at the current price.",
  },
  {
    value: "limit",
    label: "Limit Order",
    description: "Limit orders execute only at your price or better.",
  },
  {
    value: "stop",
    label: "Stop Order",
    description: "Stop orders become market orders once the stop price is hit.",
  },
]

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

type BuyInvestmentCardProps = {
  sharePrice?: number
  buyingPower?: number
  defaultAmount?: string
  onReview?: (order: { amount: number; orderType: string }) => void
}

function BuyInvestmentCard({
  sharePrice = 512.82,
  buyingPower = 12450,
  defaultAmount = "1000.00",
  onReview,
}: BuyInvestmentCardProps) {
  const [amount, setAmount] = React.useState(defaultAmount)
  const [orderType, setOrderType] = React.useState("market")

  const numericAmount = Number.parseFloat(amount.replace(/,/g, "")) || 0
  const estimatedShares = numericAmount / sharePrice
  const selected = ORDER_TYPES.find((type) => type.value === orderType)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Buy Investment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="buy-amount">Amount to Invest</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="buy-amount"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="buy-order-type">Order Type</FieldLabel>
            <Select
              value={orderType}
              onValueChange={(value) => value && setOrderType(value)}
            >
              <SelectTrigger id="buy-order-type" className="w-full">
                <SelectValue>{selected?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ORDER_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>{selected?.description}</FieldDescription>
          </Field>
        </FieldGroup>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Estimated Shares</dt>
            <dd className="font-semibold">{estimatedShares.toFixed(2)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Buying Power</dt>
            <dd className="font-semibold">{currency.format(buyingPower)}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button
          className="w-full"
          onClick={() => onReview?.({ amount: numericAmount, orderType })}
        >
          Review Order
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Trades are typically executed within minutes during market hours.
        </p>
      </CardFooter>
    </Card>
  )
}

export { BuyInvestmentCard }

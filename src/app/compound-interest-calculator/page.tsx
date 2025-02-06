"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

interface CalculationResult {
  year: number
  contributed: number
  total: number
}

export default function CompoundInterestCalculator() {
  const [initial, setInitial] = useState("")
  const [monthly, setMonthly] = useState("")
  const [years, setYears] = useState("")
  const [rate, setRate] = useState("")
  const [results, setResults] = useState<CalculationResult[]>([])
  const [totalValue, setTotalValue] = useState<number | null>(null)

  const calculateCompoundInterest = () => {
    const initialAmount = Number.parseFloat(initial) || 0
    const monthlyContribution = Number.parseFloat(monthly) || 0
    const numberOfYears = Number.parseInt(years) || 0
    const interestRate = Number.parseFloat(rate) || 0

    const calculations: CalculationResult[] = []
    let totalContributed = initialAmount

    for (let year = 0; year <= numberOfYears; year++) {
      if (year === 0) {
        calculations.push({
          year,
          contributed: initialAmount,
          total: initialAmount,
        })
        continue
      }

      const previousTotal = calculations[year - 1].total
      const yearlyContribution = monthlyContribution * 12
      totalContributed += yearlyContribution

      const totalWithInterest = (previousTotal + yearlyContribution) * (1 + interestRate / 100)

      calculations.push({
        year,
        contributed: totalContributed,
        total: totalWithInterest,
      })
    }

    setResults(calculations)
    setTotalValue(calculations[calculations.length - 1].total)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <Card>
        <CardHeader>
          <CardTitle>Investment Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="initial">Initial investment</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="initial"
                placeholder="0.00"
                className="pl-8"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="monthly">Monthly contribution</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="monthly"
                placeholder="0.00"
                className="pl-8"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="years">Years to grow</Label>
            <Input id="years" placeholder="0" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rate">Annual interest rate (%)</Label>
            <Input id="rate" placeholder="0.0" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <Button onClick={calculateCompoundInterest} className="w-full">
            Calculate
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {totalValue ? (
              <>
                The total value after {years} years
                <div className="mt-1 text-3xl">
                  $
                  {totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </>
            ) : (
              "Enter your details to see how your investments can grow with compound interest!"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <ChartContainer
              config={{
                contributed: {
                  label: "Contributed",
                  color: "hsl(var(--chart-1))",
                },
                total: {
                  label: "Total with Interest",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart
                data={results}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tickFormatter={(value) => `Year ${value}`} />
                <YAxis
                  tickFormatter={(value) =>
                    `$${value.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}`
                  }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="contributed"
                  stackId="1"
                  stroke="var(--color-contributed)"
                  fill="var(--color-contributed)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stackId="2"
                  stroke="var(--color-total)"
                  fill="var(--color-total)"
                  fillOpacity={0.2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              Chart will appear here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


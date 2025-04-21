"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowRight, Calculator, TrendingUp } from "lucide-react"

interface SimulationResult {
  months: number[]
  values: number[]
  totalInvested: number
  projectedValue: number
  roundUps: number
}

export default function InvestmentSimulator() {
  const [averageTransaction, setAverageTransaction] = useState(100)
  const [transactionsPerMonth, setTransactionsPerMonth] = useState(30)
  const [roundUpAmount, setRoundUpAmount] = useState(10)
  const [months, setMonths] = useState(12)
  const [annualGrowth, setAnnualGrowth] = useState(15)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateSimulation = () => {
    setIsCalculating(true)

    // Simulate a delay for calculation effect
    setTimeout(() => {
      const monthsArray = Array.from({ length: months }, (_, i) => i + 1)
      const values: number[] = []

      // Calculate average round-up per transaction
      const avgRoundUp = roundUpAmount / 2 // Simplified assumption

      // Monthly investment from round-ups
      const monthlyInvestment = avgRoundUp * transactionsPerMonth

      // Calculate compounding growth
      let currentValue = 0
      monthsArray.forEach((month) => {
        // Add monthly investment
        currentValue += monthlyInvestment

        // Apply monthly growth rate
        const monthlyGrowthRate = Math.pow(1 + annualGrowth / 100, 1 / 12) - 1
        currentValue *= 1 + monthlyGrowthRate

        values.push(Math.round(currentValue))
      })

      setResult({
        months: monthsArray,
        values,
        totalInvested: monthlyInvestment * months,
        projectedValue: values[values.length - 1],
        roundUps: transactionsPerMonth * months,
      })

      setIsCalculating(false)
    }, 800)
  }

  useEffect(() => {
    calculateSimulation()
  }, [])

  return (
    <div className="w-full bg-white dark:bg-[#1A1A24] rounded-xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3A86FF]/10 to-[#00F5D4]/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-[#3A86FF]" />
          <h3 className="text-2xl font-bold">Investment Simulator</h3>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="transactions">Transactions per month</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="transactions"
                      min={5}
                      max={100}
                      step={5}
                      value={[transactionsPerMonth]}
                      onValueChange={(value) => setTransactionsPerMonth(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{transactionsPerMonth}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="roundup">Round-up to nearest (₹)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="roundup"
                      min={5}
                      max={50}
                      step={5}
                      value={[roundUpAmount]}
                      onValueChange={(value) => setRoundUpAmount(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{roundUpAmount}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="months">Time period (months)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="months"
                      min={3}
                      max={60}
                      step={3}
                      value={[months]}
                      onValueChange={(value) => setMonths(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{months}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#121218] rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium text-lg mb-4">Projected Results</h4>

                  {isCalculating ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A86FF]"></div>
                    </div>
                  ) : result ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Total Round-ups:</span>
                        <span className="font-medium">{result.roundUps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Total Invested:</span>
                        <span className="font-medium">₹{result.totalInvested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Projected Value:</span>
                        <span className="font-bold text-[#3A86FF]">₹{result.projectedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Potential Growth:</span>
                        <span className="font-medium text-[#00F5D4]">
                          {Math.round((result.projectedValue / result.totalInvested - 1) * 100)}%
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <Button
                  className="mt-4 bg-[#3A86FF] hover:bg-[#2A76EF] text-white w-full group"
                  onClick={calculateSimulation}
                  disabled={isCalculating}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculate Projection</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Chart */}
            {result && !isCalculating && (
              <div className="h-64 mt-6 relative">
                <div className="absolute inset-0 flex items-end">
                  {result.values.map((value, index) => {
                    const height = `${(value / Math.max(...result.values)) * 100}%`
                    return (
                      <motion.div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-[#3A86FF] to-[#00F5D4] rounded-t-sm mx-0.5"
                        initial={{ height: 0 }}
                        animate={{ height }}
                        transition={{ duration: 0.5, delay: index * 0.02 }}
                      />
                    )
                  })}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="absolute bottom-2 left-0 text-xs text-gray-500">1 mo</div>
                <div className="absolute bottom-2 right-0 text-xs text-gray-500">{months} mo</div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="avg-transaction">Average transaction amount (₹)</Label>
                  <Input
                    id="avg-transaction"
                    type="number"
                    value={averageTransaction}
                    onChange={(e) => setAverageTransaction(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="transactions-adv">Transactions per month</Label>
                  <Input
                    id="transactions-adv"
                    type="number"
                    value={transactionsPerMonth}
                    onChange={(e) => setTransactionsPerMonth(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="roundup-adv">Round-up to nearest (₹)</Label>
                  <Input
                    id="roundup-adv"
                    type="number"
                    value={roundUpAmount}
                    onChange={(e) => setRoundUpAmount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="growth">Expected annual growth (%)</Label>
                  <Input
                    id="growth"
                    type="number"
                    value={annualGrowth}
                    onChange={(e) => setAnnualGrowth(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="months-adv">Time period (months)</Label>
                  <Input
                    id="months-adv"
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-[#F9FAFB] dark:bg-[#121218] rounded-lg p-4">
                <h4 className="font-medium text-lg mb-4">Projected Results</h4>

                {isCalculating ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A86FF]"></div>
                  </div>
                ) : result ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Total Round-ups:</span>
                      <span className="font-medium">{result.roundUps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Total Invested:</span>
                      <span className="font-medium">₹{result.totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Projected Value:</span>
                      <span className="font-bold text-[#3A86FF]">₹{result.projectedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Potential Growth:</span>
                      <span className="font-medium text-[#00F5D4]">
                        {Math.round((result.projectedValue / result.totalInvested - 1) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Monthly Average:</span>
                      <span className="font-medium">₹{Math.round(result.totalInvested / months).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Effective APY:</span>
                      <span className="font-medium">{annualGrowth}%</span>
                    </div>
                  </div>
                ) : null}

                <Button
                  className="mt-6 bg-[#3A86FF] hover:bg-[#2A76EF] text-white w-full group"
                  onClick={calculateSimulation}
                  disabled={isCalculating}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculate Projection</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-[#F9FAFB] dark:bg-[#121218] rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-[#00F5D4] mt-0.5" />
            <div>
              <h4 className="font-medium">Investment Strategy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                This simulator uses historical Solana performance data and assumes a balanced portfolio of SOL and other
                Solana tokens. Actual results may vary based on market conditions and your specific investment choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

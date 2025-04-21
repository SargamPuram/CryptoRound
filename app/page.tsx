"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, ArrowRightCircle, Check, Github, Rocket, Twitter, Play, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import CountUp from "@/components/count-up"
import InvestmentSimulator from "@/components/investment-simulator"

export default function Home() {
  const { theme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const playVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const isDark =
    mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches))

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0B0B0F] font-urbanist">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="CryptoRound Logo" width={36} height={36} className="h-9 w-9" />
            <span className="text-xl font-bold">CryptoRound</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium hover:text-[#3A86FF] transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-[#3A86FF] transition-colors">
              Features
            </Link>
            <Link href="#simulator" className="text-sm font-medium hover:text-[#3A86FF] transition-colors">
              Simulator
            </Link>
            <Link href="#demo" className="text-sm font-medium hover:text-[#3A86FF] transition-colors">
              Demo
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-[#3A86FF] transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden md:flex">
              Sign In
            </Button>
            <Button className="bg-[#3A86FF] hover:bg-[#2A76EF] text-white">Join Waitlist</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-[#0B0B0F] to-[#121218] dark:from-[#0B0B0F] dark:to-[#121218]">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3A86FF]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00F5D4]/20 rounded-full blur-3xl"></div>

            {/* Animated particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#3A86FF]/50"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Turn Everyday Spending into Smart Crypto Stacking.
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Auto-invest spare change from your payments into top tokens on Solana — effortlessly.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    size="lg"
                    className="bg-[#3A86FF] hover:bg-[#2A76EF] text-white group relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Early Access</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#3A86FF] to-[#00F5D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#00F5D4] text-[#00F5D4] hover:bg-[#00F5D4]/10 group"
                    onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    <span>Watch Demo</span>
                  </Button>
                </motion.div>

                <motion.div
                  className="flex justify-center lg:justify-start gap-8 text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-center">
                    <p className="text-[#00F5D4] text-2xl font-bold">
                      <CountUp end={10000} prefix="₹" separator="," />+
                    </p>
                    <p className="text-sm">Total Rounded Up</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#FF006E] text-2xl font-bold">
                      <CountUp end={500} />+
                    </p>
                    <p className="text-sm">Active Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#3A86FF] text-2xl font-bold">
                      <CountUp end={5} decimals={2} />
                    </p>
                    <p className="text-sm">SOL Stacked Today</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="relative mx-auto w-full max-w-md lg:max-w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3A86FF] to-[#00F5D4] rounded-3xl blur-xl opacity-30"></div>
                  <div className="relative bg-[#1A1A24]/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-800">
                    <Image
                      src="/hero-workflow.svg"
                      alt="CryptoRound Workflow"
                      width={600}
                      height={500}
                      className="w-full h-auto"
                    />
                    <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#FF006E]/30 rounded-full blur-xl"></div>
                    <div className="absolute -top-5 -left-5 w-24 h-24 bg-[#3A86FF]/30 rounded-full blur-xl"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white dark:bg-[#0F0F13]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>

            <div className="relative overflow-x-auto pb-8">
              <div className="flex flex-nowrap min-w-max md:min-w-0 md:flex-wrap justify-between items-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center w-48 md:w-auto">
                  <div className="w-16 h-16 bg-[#3A86FF]/10 dark:bg-[#3A86FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#3A86FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-center font-medium">User makes a payment</p>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center justify-center w-12">
                  <ArrowRight className="text-[#3A86FF] w-8 h-8 animate-pulse" />
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center w-48 md:w-auto">
                  <div className="w-16 h-16 bg-[#3A86FF]/10 dark:bg-[#3A86FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#3A86FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-center font-medium">Round-up detected</p>
                </div>

                {/* Arrow 2 */}
                <div className="flex items-center justify-center w-12">
                  <ArrowRight className="text-[#3A86FF] w-8 h-8 animate-pulse" />
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center w-48 md:w-auto">
                  <div className="w-16 h-16 bg-[#3A86FF]/10 dark:bg-[#3A86FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#3A86FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-center font-medium">INR converted via CoinDCX</p>
                </div>

                {/* Arrow 3 */}
                <div className="flex items-center justify-center w-12">
                  <ArrowRight className="text-[#3A86FF] w-8 h-8 animate-pulse" />
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center w-48 md:w-auto">
                  <div className="w-16 h-16 bg-[#3A86FF]/10 dark:bg-[#3A86FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#3A86FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <p className="text-center font-medium">SOL purchased</p>
                </div>

                {/* Arrow 4 */}
                <div className="flex items-center justify-center w-12">
                  <ArrowRight className="text-[#3A86FF] w-8 h-8 animate-pulse" />
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center w-48 md:w-auto">
                  <div className="w-16 h-16 bg-[#3A86FF]/10 dark:bg-[#3A86FF]/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#3A86FF]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                  <p className="text-center font-medium">Crypto sent to user wallet</p>
                </div>
              </div>

              {/* Mobile Scroll Indicator */}
              <div className="flex md:hidden justify-center mt-8">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#3A86FF]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="py-20 bg-gradient-to-br from-[#3A86FF]/5 to-[#00F5D4]/5 dark:from-[#3A86FF]/10 dark:to-[#00F5D4]/10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Real World Example</h2>
            <motion.div
              className="max-w-xl mx-auto bg-white dark:bg-[#1A1A24] rounded-2xl shadow-lg p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5D4]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>

              <div className="flex flex-col items-center space-y-8">
                <div className="flex items-center justify-between w-full max-w-md">
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-500 dark:text-gray-400">You Pay</div>
                    <div className="text-3xl font-bold">₹68</div>
                  </div>

                  <div className="flex-1 px-4">
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#3A86FF] to-[#00F5D4] relative">
                      <ArrowRightCircle className="absolute top-1/2 right-0 transform -translate-y-1/2 text-[#00F5D4] animate-pulse" />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-500 dark:text-gray-400">Rounds Up To</div>
                    <div className="text-3xl font-bold">₹100</div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-full">
                  <div className="text-center bg-[#3A86FF]/10 dark:bg-[#3A86FF]/20 rounded-xl p-6 w-full max-w-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3A86FF]/0 to-[#00F5D4]/0 group-hover:from-[#3A86FF]/10 group-hover:to-[#00F5D4]/10 transition-all duration-500"></div>
                    <div className="relative">
                      <div className="text-lg font-medium text-[#3A86FF]">Auto-Invested</div>
                      <div className="text-4xl font-bold text-[#3A86FF]">₹32</div>
                      <div className="mt-2 text-gray-600 dark:text-gray-300">in SOL or cNFTs</div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="flex items-center justify-center space-x-4"
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Image src="/rupee-coin.svg" alt="Rupee Coin" width={40} height={40} />
                  <ArrowRight className="text-[#3A86FF]" />
                  <Image src="/solana-coin.svg" alt="Solana Coin" width={40} height={40} />
                </motion.div>

                <div className="w-full bg-[#F9FAFB] dark:bg-[#121218] rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div>Live Activity Feed</div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <motion.div
                      className="text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      Riya just stacked ₹4 into SOL!
                    </motion.div>
                    <motion.div
                      className="text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 }}
                    >
                      Amit rounded up ₹7 from coffee purchase
                    </motion.div>
                    <motion.div
                      className="text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3 }}
                    >
                      Priya earned 0.001 SOL from round-ups today
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Investment Simulator Section */}
        <section id="simulator" className="py-20 bg-white dark:bg-[#0F0F13]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Investment Simulator</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-16">
              See how your spare change can grow over time with our interactive investment simulator.
            </p>

            <InvestmentSimulator />
          </div>
        </section>

        {/* Tech Stack & Architecture */}
        <section className="py-20 bg-gradient-to-br from-[#3A86FF]/5 to-[#00F5D4]/5 dark:from-[#3A86FF]/10 dark:to-[#00F5D4]/10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Tech Stack & Architecture</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <ul className="space-y-6">
                  <motion.li
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3A86FF]/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#3A86FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">CoinDCX Integration</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Uses CoinDCX APIs for seamless INR → crypto swaps
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3A86FF]/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#3A86FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Solana Blockchain</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        High-speed, low-cost transactions for efficient micro-investments
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3A86FF]/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#3A86FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">In-browser Wallet Support</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Compatible with Phantom, Okto, and other popular wallets
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3A86FF]/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#3A86FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Flexible Transaction Batching</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Transactions batched or instant based on user preference
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3A86FF]/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#3A86FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Encrypted Wallet Storage</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Fully encrypted wallet key storage for maximum security
                      </p>
                    </div>
                  </motion.li>
                </ul>
              </div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#F9FAFB] dark:bg-[#121218] rounded-xl p-6 shadow-md relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#3A86FF]/20 to-[#00F5D4]/20 rounded-full blur-2xl"></div>
                  <Image
                    src="/architecture-diagram.svg"
                    alt="CryptoRound Architecture"
                    width={600}
                    height={400}
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="py-20 bg-gradient-to-br from-[#3A86FF]/5 to-[#00F5D4]/5 dark:from-[#0B0B0F] dark:to-[#121218] dark:bg-[#0B0B0F]"
        >
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Key Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                className="bg-white dark:bg-[#1A1A24] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/0 via-transparent to-[#00F5D4]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3A86FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Round-up Limit Controls</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Set daily, weekly, or monthly limits on your round-up investments.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="bg-white dark:bg-[#1A1A24] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/0 via-transparent to-[#00F5D4]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3A86FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Token Selection Panel</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from a curated list of Solana tokens for your investments.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="bg-white dark:bg-[#1A1A24] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/0 via-transparent to-[#00F5D4]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3A86FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">UPI/Card Compatibility</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Works with all major UPI apps and credit/debit cards in India.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                className="bg-white dark:bg-[#1A1A24] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/0 via-transparent to-[#00F5D4]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3A86FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your investments and portfolio growth in real-time.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                className="bg-white dark:bg-[#1A1A24] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/0 via-transparent to-[#00F5D4]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3A86FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Daily Summaries</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get daily notifications summarizing your round-ups and investments.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                className="bg-white dark:bg-[#1A1A24] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/0 via-transparent to-[#00F5D4]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-[#3A86FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3A86FF]/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3A86FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fully Open-Source</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Transparent code available on GitHub for community review and contributions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Demo + Join Beta */}
        <section id="demo" className="py-20 bg-white dark:bg-[#0F0F13]">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Try Our Demo</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Experience how CryptoRound works with our interactive demo. See how your spare change can grow over
                  time.
                </p>

                <motion.div
                  className="bg-[#F9FAFB] dark:bg-[#1A1A24] rounded-xl p-8 shadow-md relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#3A86FF]/10 to-[#00F5D4]/10 rounded-full blur-2xl"></div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Join Our Beta Waitlist</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                    Be among the first to try CryptoRound when we launch.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                    <Input type="email" placeholder="Your email address" className="flex-1" />
                    <Button className="bg-[#3A86FF] hover:bg-[#2A76EF] text-white group relative overflow-hidden">
                      <span className="relative z-10">Get Early Access</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#3A86FF] to-[#00F5D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="bg-[#1A1A24] rounded-xl overflow-hidden shadow-lg relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-[4/3] w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/20 to-[#00F5D4]/20 opacity-50"></div>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="/app-demo-poster.jpg"
                    muted
                    playsInline
                  >
                    <source src="/app-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={playVideo}>
                    {!isVideoPlaying && (
                      <div className="w-16 h-16 bg-[#3A86FF] rounded-full flex items-center justify-center hover:bg-[#2A76EF] transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-[#1A1A24] border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="text-white font-medium">CryptoRound Demo</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#00F5D4] hover:text-[#00F5D4] hover:bg-[#00F5D4]/10"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Full Screen
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section
          id="faq"
          className="py-20 bg-gradient-to-br from-[#3A86FF]/5 to-[#00F5D4]/5 dark:from-[#0B0B0F] dark:to-[#121218] dark:bg-[#0B0B0F]"
        >
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left font-medium">
                    What happens to my spare change?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    Your spare change is calculated by rounding up your transactions to the nearest ₹10 or ₹20 (based on
                    your settings). This difference is then automatically invested into your selected Solana tokens
                    through CoinDCX's secure API.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left font-medium">
                    How safe is my wallet?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    Your wallet keys are fully encrypted and stored securely. We use industry-standard encryption
                    protocols and never have access to your private keys. You can also connect your existing Solana
                    wallet like Phantom or Okto for added security.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left font-medium">
                    What tokens can I invest in?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    CryptoRound offers a curated selection of Solana tokens including SOL, USDC, and other popular SPL
                    tokens. You can also invest in Solana-based NFTs (cNFTs) with fractional ownership options for
                    smaller investments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left font-medium">
                    Can I pause auto-investment?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    Yes, you can pause your auto-investments at any time through the app. You can also set maximum
                    daily, weekly, or monthly limits to control how much is invested automatically.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left font-medium">Are there any fees?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    CryptoRound charges a small 1% fee on each round-up investment. There are no monthly subscription
                    fees or hidden charges. Solana's transaction fees are minimal (less than ₹1 per transaction).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B0B0F] text-white py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="CryptoRound Logo" width={36} height={36} className="h-9 w-9" />
                <span className="text-xl font-bold">CryptoRound</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Turn your spare change into crypto investments on Solana. Powered by CoinDCX and Solana blockchain
                technology.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.874-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#simulator" className="text-gray-300 hover:text-white transition-colors">
                    Simulator
                  </Link>
                </li>
                <li>
                  <Link href="#demo" className="text-gray-300 hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">sargampuram3@gmail.com</li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} CryptoRound. All rights reserved.</p>
            <p className="mt-2">Powered by Solana & CoinDCX</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Trophy,
  Users,
  Calendar,
  Target,
  Zap,
  Star,
  Gamepad2,
  BarChart3,
  Shield,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Crown,
  Medal,
  Activity,
  GamepadIcon,
  TargetIcon,
  BarChartIcon,
  UsersIcon,
  CalendarIcon,
  TrophyIcon,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, setRef] = useState<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [end, duration, ref])

  return (
    <span ref={setRef}>
      {count}
      {suffix}
    </span>
  )
}

// Floating football background
function FloatingFootball() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const { supabase } = useSupabase()
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalTeams: 0,
    totalMatches: 0,
    activeSeasons: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [playersRes, teamsRes, matchesRes, seasonsRes] = await Promise.all([
          supabase.from("users").select("id", { count: "exact" }),
          supabase.from("teams").select("id", { count: "exact" }).eq("is_active", true),
          supabase.from("matches").select("id", { count: "exact" }),
          supabase.from("seasons").select("id", { count: "exact" }).eq("is_active", true),
        ])

        setStats({
          totalPlayers: playersRes.count || 0,
          totalTeams: teamsRes.count || 0,
          totalMatches: matchesRes.count || 0,
          activeSeasons: seasonsRes.count || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingFootball />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.div
                className="p-4 bg-gradient-to-r from-primary to-trophy rounded-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Gamepad2 className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-6xl font-bold league-title">
                FC26 Premier League
              </h1>
            </div>
            <div className="h-2 w-40 bg-gradient-to-r from-primary to-trophy rounded-full mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Premier EA Sports FC 26 League
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join the most competitive EA Sports FC 26 football league with professional-grade 
              statistics tracking, team management, and championship tournaments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-trophy hover:from-primary/90 hover:to-trophy/90">
              <Link href="/register" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Join the League
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/matches" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                View Matches
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="relative -mt-20 z-10 mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <Card className="backdrop-blur-md bg-background/90 border-primary/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-trophy/5" />
            <CardContent className="relative p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">League Statistics</h2>
                <p className="text-muted-foreground">Real-time data from our competitive football league</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    icon: UsersIcon,
                    label: "Active Players",
                    value: stats.totalPlayers,
                    color: "text-blue-500",
                    desc: "Registered competitors",
                  },
                  {
                    icon: TrophyIcon,
                    label: "Teams",
                    value: stats.totalTeams,
                    color: "text-green-500",
                    desc: "Active clubs",
                  },
                  {
                    icon: CalendarIcon,
                    label: "Matches Played",
                    value: stats.totalMatches,
                    color: "text-purple-500",
                    desc: "Total games tracked",
                  },
                  {
                    icon: Star,
                    label: "Active Seasons",
                    value: stats.activeSeasons,
                    color: "text-orange-500",
                    desc: "Current competitions",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`${stat.color} mb-2 mx-auto w-fit`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="h-8 w-8" />
                    </motion.div>
                    <div className="text-3xl font-bold mb-1">
                      {loading ? "..." : <AnimatedCounter end={stat.value} />}
                    </div>
                    <div className="text-sm font-medium mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-stadium to-stadium-light rounded-xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-stadium to-stadium-light bg-clip-text text-transparent">
              Why Choose FC26 Clubs?
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-stadium to-transparent rounded-full mx-auto mb-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-stadium/20 bg-gradient-to-br from-background to-stadium/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-stadium/20 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-stadium" />
                  </div>
                  <CardTitle className="text-xl">Advanced Statistics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our proprietary system tracks every aspect of EA Sports FC 26 gameplay, 
                  including goals, assists, passes, tackles, and advanced metrics like 
                  possession and shot accuracy.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-stadium" />
                    Real-time match statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-stadium" />
                    Player performance analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChartIcon className="h-4 w-4 text-stadium" />
                    Historical data tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-trophy/20 bg-gradient-to-br from-background to-trophy/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-trophy/20 rounded-lg">
                    <Users className="h-6 w-6 text-trophy" />
                  </div>
                  <CardTitle className="text-xl">Professional Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Complete team management system with transfers, contracts, formations, 
                  and tactical analysis that creates an authentic football club experience.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-trophy" />
                    Transfer market system
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-trophy" />
                    Scheduled seasons
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-trophy" />
                    Championship playoffs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Global Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Join thousands of dedicated EA Sports FC 26 players from around the world 
                  in a mature, competitive environment with fair play and sportsmanship.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    Active community
                  </li>
                  <li className="flex items-center gap-2">
                    <Medal className="h-4 w-4 text-primary" />
                    Fair competition
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Professional moderation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-12 -translate-x-12" />

          <CardContent className="relative p-12 text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="mb-6"
            >
              <Trophy className="h-16 w-16 mx-auto text-primary" />
            </motion.div>

            <h2 className="text-4xl font-bold mb-4 league-title">
              Ready to Compete?
            </h2>
            <p className="text-xl mb-4 max-w-3xl mx-auto text-muted-foreground">
              Join the premier EA Sports FC 26 competitive league with professional-grade 
              statistics tracking, team management, and championship tournaments.
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
              Free to join, competitive gameplay, real rewards!
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-trophy hover:from-primary/90 hover:to-trophy/90 shadow-lg"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Join FC26 Premier League
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-primary/30 hover:bg-primary/10 backdrop-blur-sm bg-transparent"
                >
                  <Link href="/matches" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    View Live Matches
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free to Play</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Live Statistics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Real</div>
                <div className="text-sm text-muted-foreground">Competition</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}

"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Trophy,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Star,
  Crown,
  Shield,
  Zap,
  Award,
  Activity,
  BarChart3,
  Gamepad2,
  Plus,
  Eye,
  Edit,
  Settings,
  Bell,
  User,
  LogOut,
  Home,
  ChevronRight,
  Clock,
  MapPin,
  Play,
  Pause,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface DashboardStats {
  totalMatches: number
  totalGoals: number
  totalAssists: number
  winRate: number
  currentRating: number
  teamPosition: number
  nextMatch?: {
    id: string
    opponent: string
    date: string
    time: string
    venue: string
  }
  recentMatches: Array<{
    id: string
    opponent: string
    result: "W" | "L" | "D"
    score: string
    date: string
  }>
}

export default function DashboardPage() {
  const { supabase, user } = useSupabase()
  const [stats, setStats] = useState<DashboardStats>({
    totalMatches: 0,
    totalGoals: 0,
    totalAssists: 0,
    winRate: 0,
    currentRating: 0,
    teamPosition: 0,
    recentMatches: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Mock data for demonstration
        setStats({
          totalMatches: 24,
          totalGoals: 18,
          totalAssists: 12,
          winRate: 75,
          currentRating: 8.7,
          teamPosition: 3,
          nextMatch: {
            id: "1",
            opponent: "Team Alpha",
            date: "2024-01-15",
            time: "19:00",
            venue: "Stadium Central",
          },
          recentMatches: [
            { id: "1", opponent: "Team Beta", result: "W", score: "3-1", date: "2024-01-10" },
            { id: "2", opponent: "Team Gamma", result: "D", score: "2-2", date: "2024-01-08" },
            { id: "3", opponent: "Team Delta", result: "W", score: "4-0", date: "2024-01-05" },
            { id: "4", opponent: "Team Epsilon", result: "L", score: "1-2", date: "2024-01-02" },
            { id: "5", opponent: "Team Zeta", result: "W", score: "2-1", date: "2023-12-30" },
          ],
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getResultColor = (result: string) => {
    switch (result) {
      case "W": return "text-green-500 bg-green-500/10"
      case "L": return "text-red-500 bg-red-500/10"
      case "D": return "text-yellow-500 bg-yellow-500/10"
      default: return "text-muted-foreground bg-muted/10"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-trophy"
    if (rating >= 8) return "text-primary"
    if (rating >= 7) return "text-stadium"
    return "text-muted-foreground"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold league-title mb-2">
                Welcome back, {user?.user_metadata?.username || "Player"}!
              </h1>
              <p className="text-muted-foreground">
                Here's your FC26 Premier League dashboard overview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { title: "Matches Played", value: stats.totalMatches, icon: Calendar, color: "text-blue-500" },
              { title: "Goals Scored", value: stats.totalGoals, icon: Target, color: "text-red-500" },
              { title: "Assists", value: stats.totalAssists, icon: Zap, color: "text-purple-500" },
              { title: "Win Rate", value: `${stats.winRate}%`, icon: Trophy, color: "text-green-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-current/10 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.title}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Rating & Position */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Your Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-primary/10 rounded-lg">
                      <div className={`text-4xl font-bold mb-2 ${getRatingColor(stats.currentRating)}`}>
                        {stats.currentRating.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">Current Rating</div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(stats.currentRating / 2) ? "text-trophy fill-current" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-trophy/10 rounded-lg">
                      <div className="text-4xl font-bold text-trophy mb-2">#{stats.teamPosition}</div>
                      <div className="text-sm text-muted-foreground mb-2">League Position</div>
                      <Badge className="bg-trophy/20 text-trophy">
                        {stats.teamPosition <= 3 ? "Champions League" : "League"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Matches */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Recent Matches
                    </CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/matches" className="flex items-center gap-2">
                        View All
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.recentMatches.map((match, index) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge className={`${getResultColor(match.result)}`}>
                            {match.result}
                          </Badge>
                          <div>
                            <div className="font-medium">vs {match.opponent}</div>
                            <div className="text-sm text-muted-foreground">{match.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{match.score}</div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/matches/${match.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Next Match */}
            {stats.nextMatch && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Next Match
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold mb-2">vs {stats.nextMatch.opponent}</div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {new Date(stats.nextMatch.date).toLocaleDateString()} at {stats.nextMatch.time}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        {stats.nextMatch.venue}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-trophy">
                        <Play className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/teams" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Manage Team
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/matches" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule Match
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/statistics" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        View Statistics
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/standings" className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        League Standings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* League News */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    League News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Transfer Window Opens", time: "2 hours ago" },
                      { title: "New Season Schedule Released", time: "1 day ago" },
                      { title: "Player of the Month Award", time: "3 days ago" },
                    ].map((news, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{news.title}</div>
                          <div className="text-xs text-muted-foreground">{news.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

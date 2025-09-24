"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Trophy,
  Users,
  Calendar,
  Star,
  Award,
  Activity,
  Zap,
  Crown,
  Shield,
  Medal,
  Gamepad2,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  LineChart,
  BarChart,
  TargetIcon,
  ActivityIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface StatCard {
  title: string
  value: string | number
  change: number
  icon: React.ComponentType<any>
  color: string
  description: string
}

interface ChartData {
  name: string
  value: number
  color: string
}

export default function StatisticsPage() {
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"week" | "month" | "season">("season")
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalGoals: 0,
    totalPlayers: 0,
    totalTeams: 0,
    averageRating: 0,
    topScorer: "",
    topAssists: "",
    mostWins: "",
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [matchesRes, playersRes, teamsRes] = await Promise.all([
          supabase.from("matches").select("id, home_score, away_score", { count: "exact" }),
          supabase.from("users").select("id", { count: "exact" }),
          supabase.from("teams").select("id", { count: "exact" }),
        ])

        const totalMatches = matchesRes.count || 0
        const totalGoals = matchesRes.data?.reduce((sum, match) => 
          sum + (match.home_score || 0) + (match.away_score || 0), 0) || 0
        const totalPlayers = playersRes.count || 0
        const totalTeams = teamsRes.count || 0

        setStats({
          totalMatches,
          totalGoals,
          totalPlayers,
          totalTeams,
          averageRating: 8.2,
          topScorer: "PlayerName",
          topAssists: "PlayerName2",
          mostWins: "TeamName",
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  const statCards: StatCard[] = [
    {
      title: "Total Matches",
      value: stats.totalMatches,
      change: 12.5,
      icon: Calendar,
      color: "text-blue-500",
      description: "Matches played this season"
    },
    {
      title: "Total Goals",
      value: stats.totalGoals,
      change: 8.3,
      icon: Target,
      color: "text-red-500",
      description: "Goals scored across all matches"
    },
    {
      title: "Active Players",
      value: stats.totalPlayers,
      change: 15.2,
      icon: Users,
      color: "text-green-500",
      description: "Registered players in the league"
    },
    {
      title: "Active Teams",
      value: stats.totalTeams,
      change: 5.7,
      icon: Trophy,
      color: "text-purple-500",
      description: "Teams competing this season"
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      change: 2.1,
      icon: Star,
      color: "text-yellow-500",
      description: "Average player performance rating"
    },
    {
      title: "Top Scorer",
      value: stats.topScorer,
      change: 0,
      icon: Crown,
      color: "text-trophy",
      description: "Leading goal scorer"
    }
  ]

  const chartData: ChartData[] = [
    { name: "Goals", value: 45, color: "bg-red-500" },
    { name: "Assists", value: 32, color: "bg-blue-500" },
    { name: "Clean Sheets", value: 18, color: "bg-green-500" },
    { name: "Saves", value: 25, color: "bg-purple-500" },
  ]

  const teamPerformanceData = [
    { team: "Team A", wins: 15, losses: 3, draws: 2, points: 47 },
    { team: "Team B", wins: 12, losses: 5, draws: 3, points: 39 },
    { team: "Team C", wins: 10, losses: 7, draws: 3, points: 33 },
    { team: "Team D", wins: 8, losses: 8, draws: 4, points: 28 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
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
                <BarChart3 className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 Statistics
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
              League Analytics & Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive statistics and analytics for the FC26 Premier League. 
              Track performance trends, player statistics, and team analytics.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="season">This Season</option>
            </select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-current/10 ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{stat.title}</CardTitle>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${stat.change > 0 ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}
                    >
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change > 0 ? 'Increased' : 'Decreased'} from last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Charts Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm font-bold">{item.value}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / 50) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Performance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformanceData.map((team, index) => (
                    <div key={team.team} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-trophy rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{team.team}</span>
                          <span className="font-bold text-primary">{team.points} pts</span>
                        </div>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>{team.wins}W</span>
                          <span>{team.draws}D</span>
                          <span>{team.losses}L</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Detailed Analytics */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Top Scorer", player: "PlayerName", value: "25 goals", icon: Target },
                    { category: "Most Assists", player: "PlayerName2", value: "18 assists", icon: Zap },
                    { category: "Best Rating", player: "PlayerName3", value: "9.2 rating", icon: Star },
                    { category: "Most Wins", player: "PlayerName4", value: "15 wins", icon: Trophy },
                  ].map(({ category, player, value, icon: Icon }) => (
                    <div key={category} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">{category}</div>
                        <div className="text-sm text-muted-foreground">{player}</div>
                      </div>
                      <Badge variant="outline" className="border-primary/30">
                        {value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* League Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  League Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { insight: "Average Goals per Match", value: "3.2", trend: "+0.3" },
                    { insight: "Most Competitive Month", value: "March", trend: "15 matches" },
                    { insight: "Highest Scoring Team", value: "Team A", trend: "45 goals" },
                    { insight: "Best Defensive Record", value: "Team B", trend: "12 goals conceded" },
                  ].map(({ insight, value, trend }) => (
                    <div key={insight} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <div>
                        <div className="font-medium">{insight}</div>
                        <div className="text-sm text-muted-foreground">{trend}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

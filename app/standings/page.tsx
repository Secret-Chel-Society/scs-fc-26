"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Trophy,
  Crown,
  Star,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Users,
  Calendar,
  BarChart3,
  Award,
  Medal,
  Zap,
  Activity,
  Gamepad2,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface TeamStanding {
  id: string
  name: string
  abbreviation: string
  logo_url?: string
  position: number
  played: number
  wins: number
  draws: number
  losses: number
  goals_for: number
  goals_against: number
  goal_difference: number
  points: number
  form: string[]
  last_5_matches: string[]
}

export default function StandingsPage() {
  const { supabase } = useSupabase()
  const [standings, setStandings] = useState<TeamStanding[]>([])
  const [loading, setLoading] = useState(true)
  const [season, setSeason] = useState("current")

  useEffect(() => {
    async function fetchStandings() {
      try {
        const { data, error } = await supabase
          .from("teams")
          .select(`
            *,
            matches_home:matches!home_team_id(*),
            matches_away:matches!away_team_id(*)
          `)
          .eq("is_active", true)

        if (error) throw error

        // Calculate standings from match data
        const standingsData = data?.map((team: any, index) => {
          const allMatches = [...(team.matches_home || []), ...(team.matches_away || [])]
          const completedMatches = allMatches.filter(m => m.status === "completed")
          
          let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0
          
          completedMatches.forEach(match => {
            const isHome = match.home_team_id === team.id
            const teamScore = isHome ? match.home_score : match.away_score
            const opponentScore = isHome ? match.away_score : match.home_score
            
            goalsFor += teamScore || 0
            goalsAgainst += opponentScore || 0
            
            if (teamScore > opponentScore) wins++
            else if (teamScore === opponentScore) draws++
            else losses++
          })
          
          const points = wins * 3 + draws
          const goalDifference = goalsFor - goalsAgainst
          
          return {
            id: team.id,
            name: team.name,
            abbreviation: team.abbreviation,
            logo_url: team.logo_url,
            position: index + 1,
            played: completedMatches.length,
            wins,
            draws,
            losses,
            goals_for: goalsFor,
            goals_against: goalsAgainst,
            goal_difference: goalDifference,
            points,
            form: ["W", "W", "L", "D", "W"], // Mock form data
            last_5_matches: ["W", "W", "L", "D", "W"], // Mock last 5 matches
          }
        }).sort((a, b) => b.points - a.points || b.goal_difference - a.goal_difference) || []

        // Update positions after sorting
        const finalStandings = standingsData.map((team, index) => ({
          ...team,
          position: index + 1
        }))

        setStandings(finalStandings)
      } catch (error) {
        console.error("Error fetching standings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
  }, [supabase])

  const getPositionIcon = (position: number) => {
    if (position === 1) return { icon: Crown, color: "text-trophy", bg: "bg-trophy/20" }
    if (position <= 3) return { icon: Trophy, color: "text-primary", bg: "bg-primary/20" }
    if (position <= 6) return { icon: Star, color: "text-stadium", bg: "bg-stadium/20" }
    if (position <= 10) return { icon: Shield, color: "text-secondary", bg: "bg-secondary/20" }
    return { icon: Medal, color: "text-muted-foreground", bg: "bg-muted/20" }
  }

  const getFormColor = (result: string) => {
    switch (result) {
      case "W": return "bg-green-500"
      case "D": return "bg-yellow-500"
      case "L": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getPositionBadge = (position: number) => {
    if (position === 1) return { text: "Champions", color: "bg-trophy" }
    if (position <= 3) return { text: "Champions League", color: "bg-primary" }
    if (position <= 6) return { text: "Europa League", color: "bg-stadium" }
    if (position <= 10) return { text: "Mid Table", color: "bg-secondary" }
    return { text: "Relegation Zone", color: "bg-red-500" }
  }

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
                <Trophy className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 Standings
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
              Premier League Table
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Current standings for the FC26 Premier League. Track your team's progress 
              and see who's leading the championship race.
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
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="current">Current Season</option>
              <option value="previous">Previous Season</option>
            </select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Standings Table */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-primary" />
                  League Standings
                </CardTitle>
                <Badge variant="outline" className="border-primary/30">
                  {standings.length} Teams
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6">
                  <div className="space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 animate-pulse">
                        <div className="h-8 w-8 bg-muted rounded"></div>
                        <div className="h-12 w-12 bg-muted rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                          <div className="h-3 bg-muted rounded w-1/6"></div>
                        </div>
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="h-6 w-6 bg-muted rounded"></div>
                          ))}
                        </div>
                        <div className="h-6 w-12 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary/10 bg-primary/5">
                        <th className="text-left p-4 font-semibold">Pos</th>
                        <th className="text-left p-4 font-semibold">Team</th>
                        <th className="text-center p-4 font-semibold">P</th>
                        <th className="text-center p-4 font-semibold">W</th>
                        <th className="text-center p-4 font-semibold">D</th>
                        <th className="text-center p-4 font-semibold">L</th>
                        <th className="text-center p-4 font-semibold">GF</th>
                        <th className="text-center p-4 font-semibold">GA</th>
                        <th className="text-center p-4 font-semibold">GD</th>
                        <th className="text-center p-4 font-semibold">Pts</th>
                        <th className="text-center p-4 font-semibold">Form</th>
                        <th className="text-center p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, index) => {
                        const positionIcon = getPositionIcon(team.position)
                        const positionBadge = getPositionBadge(team.position)
                        
                        return (
                          <motion.tr
                            key={team.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`border-b border-primary/5 hover:bg-primary/5 transition-colors ${
                              team.position <= 3 ? "bg-gradient-to-r from-primary/5 to-transparent" : ""
                            }`}
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${positionIcon.bg}`}>
                                  <positionIcon.icon className={`h-4 w-4 ${positionIcon.color}`} />
                                </div>
                                <span className="font-bold text-lg">{team.position}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-trophy rounded-xl flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {team.abbreviation}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold">{team.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {team.abbreviation}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center font-semibold">{team.played}</td>
                            <td className="p-4 text-center text-green-500 font-semibold">{team.wins}</td>
                            <td className="p-4 text-center text-yellow-500 font-semibold">{team.draws}</td>
                            <td className="p-4 text-center text-red-500 font-semibold">{team.losses}</td>
                            <td className="p-4 text-center font-semibold">{team.goals_for}</td>
                            <td className="p-4 text-center font-semibold">{team.goals_against}</td>
                            <td className={`p-4 text-center font-semibold ${
                              team.goal_difference > 0 ? "text-green-500" : 
                              team.goal_difference < 0 ? "text-red-500" : "text-muted-foreground"
                            }`}>
                              {team.goal_difference > 0 ? "+" : ""}{team.goal_difference}
                            </td>
                            <td className="p-4 text-center">
                              <div className="font-bold text-lg text-primary">{team.points}</div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex gap-1 justify-center">
                                {team.form.map((result, i) => (
                                  <div
                                    key={i}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getFormColor(result)}`}
                                  >
                                    {result}
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <Badge className={positionBadge.color}>
                                {positionBadge.text}
                              </Badge>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* League Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-trophy" />
                Champions League
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Top 3 teams qualify for the Champions League playoffs
              </p>
              <div className="space-y-2">
                {standings.slice(0, 3).map((team, index) => (
                  <div key={team.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-trophy/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-trophy">{index + 1}</span>
                    </div>
                    <span className="text-sm">{team.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-stadium/20 bg-gradient-to-br from-background to-stadium/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-stadium" />
                Europa League
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Teams 4-6 qualify for the Europa League playoffs
              </p>
              <div className="space-y-2">
                {standings.slice(3, 6).map((team, index) => (
                  <div key={team.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-stadium/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-stadium">{index + 4}</span>
                    </div>
                    <span className="text-sm">{team.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-gradient-to-br from-background to-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Relegation Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Bottom 3 teams face relegation playoffs
              </p>
              <div className="space-y-2">
                {standings.slice(-3).reverse().map((team, index) => (
                  <div key={team.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-red-500">{standings.length - index}</span>
                    </div>
                    <span className="text-sm">{team.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

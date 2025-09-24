"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Calendar,
  Clock,
  Trophy,
  Target,
  Users,
  MapPin,
  Play,
  Pause,
  Eye,
  BarChart3,
  Filter,
  Search,
  Plus,
  Gamepad2,
  Star,
  Award,
  TrendingUp,
  Activity,
  Zap,
  Crown,
  Shield,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface Match {
  id: string
  home_team_id: string
  away_team_id: string
  home_team: {
    name: string
    abbreviation: string
    logo_url?: string
  }
  away_team: {
    name: string
    abbreviation: string
    logo_url?: string
  }
  match_date: string
  status: "scheduled" | "live" | "completed" | "postponed"
  home_score?: number
  away_score?: number
  season_id: string
  competition_type: string
  venue?: string
  referee?: string
}

export default function MatchesPage() {
  const { supabase } = useSupabase()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "completed">("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchMatches() {
      try {
        const { data, error } = await supabase
          .from("matches")
          .select(`
            *,
            home_team:teams!home_team_id(name, abbreviation, logo_url),
            away_team:teams!away_team_id(name, abbreviation, logo_url)
          `)
          .order("match_date", { ascending: false })
          .limit(50)

        if (error) throw error
        setMatches(data || [])
      } catch (error) {
        console.error("Error fetching matches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [supabase])

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.home_team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.away_team.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    switch (filter) {
      case "live":
        return match.status === "live" && matchesSearch
      case "upcoming":
        return match.status === "scheduled" && matchesSearch
      case "completed":
        return match.status === "completed" && matchesSearch
      default:
        return matchesSearch
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-red-500"
      case "completed": return "bg-green-500"
      case "scheduled": return "bg-blue-500"
      case "postponed": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live": return Play
      case "completed": return Trophy
      case "scheduled": return Clock
      case "postponed": return Pause
      default: return Calendar
    }
  }

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
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
                <Calendar className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 Matches
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
              Live & Upcoming Matches
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Follow all FC26 Premier League matches in real-time. Watch live games, 
              check upcoming fixtures, and review match results.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Matches", icon: Calendar },
                { key: "live", label: "Live", icon: Play },
                { key: "upcoming", label: "Upcoming", icon: Clock },
                { key: "completed", label: "Results", icon: Trophy },
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={filter === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(key as any)}
                  className={filter === key ? "bg-gradient-to-r from-primary to-trophy" : ""}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-trophy">
              <Link href="/matches/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Schedule Match
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Live Matches Banner */}
      {matches.some(m => m.status === "live") && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 mb-8"
        >
          <Card className="bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Play className="h-6 w-6 text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-red-500">LIVE MATCHES</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.filter(m => m.status === "live").slice(0, 3).map((match) => (
                  <div key={match.id} className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {formatMatchDate(match.match_date).time}
                      </span>
                      <Badge className="bg-red-500 text-white animate-pulse">
                        LIVE
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="font-semibold">{match.home_team.name}</div>
                        <div className="text-2xl font-bold text-primary">{match.home_score || 0}</div>
                      </div>
                      <div className="text-muted-foreground">vs</div>
                      <div className="text-center">
                        <div className="font-semibold">{match.away_team.name}</div>
                        <div className="text-2xl font-bold text-primary">{match.away_score || 0}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}

      {/* Matches Grid */}
      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-8 bg-muted rounded w-16"></div>
                    <div className="flex items-center gap-4">
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-16"></div>
                        <div className="h-4 bg-muted rounded w-24"></div>
                      </div>
                      <div className="h-12 w-12 bg-muted rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match, index) => {
              const StatusIcon = getStatusIcon(match.status)
              const matchDate = formatMatchDate(match.match_date)
              
              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className={`border-primary/20 bg-gradient-to-r from-background to-primary/5 hover:shadow-xl transition-all duration-300 ${
                    match.status === "live" ? "ring-2 ring-red-500/50" : ""
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        {/* Home Team */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-trophy rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {match.home_team.abbreviation}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-lg">{match.home_team.name}</div>
                            <div className="text-sm text-muted-foreground">Home</div>
                          </div>
                        </div>

                        {/* Match Info */}
                        <div className="flex flex-col items-center gap-2 px-8">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-5 w-5 ${getStatusColor(match.status).replace('bg-', 'text-')}`} />
                            <Badge className={getStatusColor(match.status)}>
                              {match.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          {match.status === "completed" ? (
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary mb-1">
                                {match.home_score} - {match.away_score}
                              </div>
                              <div className="text-sm text-muted-foreground">{matchDate.date}</div>
                            </div>
                          ) : match.status === "live" ? (
                            <div className="text-center">
                              <div className="text-3xl font-bold text-red-500 mb-1">
                                {match.home_score || 0} - {match.away_score || 0}
                              </div>
                              <div className="text-sm text-red-500 font-medium">LIVE</div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="text-lg font-semibold text-muted-foreground mb-1">vs</div>
                              <div className="text-sm text-muted-foreground">{matchDate.date}</div>
                              <div className="text-sm text-muted-foreground">{matchDate.time}</div>
                            </div>
                          )}
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center gap-4 flex-1 justify-end">
                          <div>
                            <div className="font-semibold text-lg text-right">{match.away_team.name}</div>
                            <div className="text-sm text-muted-foreground text-right">Away</div>
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-r from-trophy to-primary rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {match.away_team.abbreviation}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Match Details */}
                      <div className="mt-4 pt-4 border-t border-primary/10">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            {match.venue && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{match.venue}</span>
                              </div>
                            )}
                            {match.referee && (
                              <div className="flex items-center gap-1">
                                <Shield className="h-4 w-4" />
                                <span>{match.referee}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/matches/${match.id}`} className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                            {match.status === "live" && (
                              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                                <Play className="h-4 w-4 mr-2" />
                                Watch Live
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {!loading && filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "No matches have been scheduled yet"}
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-trophy">
              <Link href="/matches/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Schedule First Match
              </Link>
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

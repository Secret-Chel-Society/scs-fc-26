"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Users,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  Crown,
  Shield,
  Zap,
  Award,
  Activity,
  BarChart3,
  Gamepad2,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface Team {
  id: string
  name: string
  abbreviation: string
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  founded_year?: number
  home_stadium?: string
  manager_name?: string
  is_active: boolean
  wins: number
  losses: number
  draws: number
  goals_for: number
  goals_against: number
  points: number
  position: number
}

export default function TeamsPage() {
  const { supabase } = useSupabase()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"points" | "name" | "wins">("points")

  useEffect(() => {
    async function fetchTeams() {
      try {
        const { data, error } = await supabase
          .from("teams")
          .select(`
            *,
            matches_home:matches!home_team_id(count),
            matches_away:matches!away_team_id(count)
          `)
          .eq("is_active", true)
          .order("points", { ascending: false })

        if (error) throw error

        // Calculate stats for each team
        const teamsWithStats = data?.map((team, index) => ({
          ...team,
          position: index + 1,
          wins: Math.floor(Math.random() * 20) + 5, // Mock data
          losses: Math.floor(Math.random() * 15) + 2,
          draws: Math.floor(Math.random() * 10) + 1,
          goals_for: Math.floor(Math.random() * 50) + 20,
          goals_against: Math.floor(Math.random() * 40) + 15,
          points: Math.floor(Math.random() * 60) + 20,
        })) || []

        setTeams(teamsWithStats)
      } catch (error) {
        console.error("Error fetching teams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [supabase])

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (sortBy) {
      case "points":
        return b.points - a.points
      case "wins":
        return b.wins - a.wins
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-trophy"
    if (position <= 6) return "text-primary"
    if (position <= 10) return "text-stadium"
    return "text-muted-foreground"
  }

  const getPositionBadge = (position: number) => {
    if (position === 1) return { icon: Crown, color: "bg-trophy", text: "Champions" }
    if (position <= 3) return { icon: Trophy, color: "bg-primary", text: "Top 3" }
    if (position <= 6) return { icon: Star, color: "bg-stadium", text: "Top 6" }
    return { icon: Shield, color: "bg-muted", text: "League" }
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
                <Users className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 Teams
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
              Premier League Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover all teams competing in the FC26 Premier League. View their statistics, 
              recent performance, and team management details.
            </p>
          </motion.div>

          {/* Search and Filter */}
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "points" | "name" | "wins")}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="points">Sort by Points</option>
              <option value="wins">Sort by Wins</option>
              <option value="name">Sort by Name</option>
            </select>
            <Button asChild className="bg-gradient-to-r from-primary to-trophy">
              <Link href="/teams/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Team
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTeams.map((team, index) => {
              const positionBadge = getPositionBadge(team.position)
              return (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl" />
                    
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-trophy rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {team.abbreviation}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-xl">{team.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Founded {team.founded_year || "2024"}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${positionBadge.color} text-white`}>
                          #{team.position}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <positionBadge.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{positionBadge.text}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="relative">
                      {/* Team Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{team.points}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center p-3 bg-trophy/10 rounded-lg">
                          <div className="text-2xl font-bold text-trophy">{team.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div className="text-center p-3 bg-stadium/10 rounded-lg">
                          <div className="text-2xl font-bold text-stadium">{team.goals_for}</div>
                          <div className="text-xs text-muted-foreground">Goals For</div>
                        </div>
                        <div className="text-center p-3 bg-secondary/10 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{team.goals_against}</div>
                          <div className="text-xs text-muted-foreground">Goals Against</div>
                        </div>
                      </div>

                      {/* Team Info */}
                      <div className="space-y-2 mb-6">
                        {team.home_stadium && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{team.home_stadium}</span>
                          </div>
                        )}
                        {team.manager_name && (
                          <div className="flex items-center gap-2 text-sm">
                            <Crown className="h-4 w-4 text-muted-foreground" />
                            <span>Manager: {team.manager_name}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/teams/${team.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/teams/${team.id}/edit`} className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {!loading && sortedTeams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No teams found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "No teams have been created yet"}
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-trophy">
              <Link href="/teams/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create First Team
              </Link>
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

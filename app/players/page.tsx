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
  User,
  Medal,
  TargetIcon,
  TrendingDown,
  Globe,
  Heart,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface Player {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
  avatar_url?: string
  country?: string
  date_of_birth?: string
  preferred_position?: string
  team_id?: string
  team?: {
    name: string
    abbreviation: string
    logo_url?: string
  }
  is_active: boolean
  stats: {
    goals: number
    assists: number
    matches_played: number
    rating: number
    wins: number
    losses: number
  }
}

export default function PlayersPage() {
  const { supabase } = useSupabase()
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "top_scorers" | "top_assists" | "top_rated">("all")
  const [sortBy, setSortBy] = useState<"rating" | "goals" | "assists" | "name">("rating")

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select(`
            *,
            team:teams(name, abbreviation, logo_url)
          `)
          .eq("is_active", true)
          .limit(50)

        if (error) throw error

        // Add mock stats for demonstration
        const playersWithStats = data?.map((player: any, index: number) => ({
          ...player,
          stats: {
            goals: Math.floor(Math.random() * 30) + 5,
            assists: Math.floor(Math.random() * 20) + 3,
            matches_played: Math.floor(Math.random() * 25) + 10,
            rating: Math.floor(Math.random() * 2) + 8 + Math.random(),
            wins: Math.floor(Math.random() * 15) + 5,
            losses: Math.floor(Math.random() * 10) + 2,
          }
        })) || []

        setPlayers(playersWithStats)
      } catch (error) {
        console.error("Error fetching players:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [supabase])

  const filteredPlayers = players.filter(player =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedPlayers = [...filteredPlayers].sort((a: any, b: any) => {
    switch (sortBy) {
      case "rating":
        return b.stats.rating - a.stats.rating
      case "goals":
        return b.stats.goals - a.stats.goals
      case "assists":
        return b.stats.assists - a.stats.assists
      case "name":
        return a.username.localeCompare(b.username)
      default:
        return 0
    }
  })

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-trophy"
    if (rating >= 8) return "text-primary"
    if (rating >= 7) return "text-stadium"
    return "text-muted-foreground"
  }

  const getPositionIcon = (position?: string) => {
    switch (position?.toLowerCase()) {
      case "striker": return Target
      case "midfielder": return Activity
      case "defender": return Shield
      case "goalkeeper": return Crown
      default: return User
    }
  }

  const getPositionColor = (position?: string) => {
    switch (position?.toLowerCase()) {
      case "striker": return "text-red-500"
      case "midfielder": return "text-blue-500"
      case "defender": return "text-green-500"
      case "goalkeeper": return "text-purple-500"
      default: return "text-muted-foreground"
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
                <Users className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 Players
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
              Premier League Players
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the top players in the FC26 Premier League. View their statistics, 
              performance ratings, and team affiliations.
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
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Players</option>
              <option value="top_scorers">Top Scorers</option>
              <option value="top_assists">Top Assists</option>
              <option value="top_rated">Top Rated</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="rating">Sort by Rating</option>
              <option value="goals">Sort by Goals</option>
              <option value="assists">Sort by Assists</option>
              <option value="name">Sort by Name</option>
            </select>
            <Button asChild className="bg-gradient-to-r from-primary to-trophy">
              <Link href="/players/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Player
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Top Players Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Top Scorer", icon: Target, color: "from-red-500 to-red-600", players: sortedPlayers.slice(0, 1) },
            { title: "Top Assists", icon: Zap, color: "from-blue-500 to-blue-600", players: sortedPlayers.slice(1, 2) },
            { title: "Top Rated", icon: Star, color: "from-trophy to-yellow-500", players: sortedPlayers.slice(2, 3) },
          ].map(({ title, icon: Icon, color, players }) => (
            <Card key={title} className={`bg-gradient-to-r ${color} text-white border-0 overflow-hidden`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">{title}</h3>
                </div>
                {players[0] && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {players[0].username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{players[0].username}</div>
                      <div className="text-sm opacity-90">
                        {title === "Top Scorer" && `${players[0].stats.goals} goals`}
                        {title === "Top Assists" && `${players[0].stats.assists} assists`}
                        {title === "Top Rated" && `${players[0].stats.rating.toFixed(1)} rating`}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Players Grid */}
      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-muted rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-24"></div>
                      <div className="h-3 bg-muted rounded w-16"></div>
                    </div>
                  </div>
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
            {sortedPlayers.map((player, index) => {
              const PositionIcon = getPositionIcon(player.preferred_position)
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl" />
                    
                    <CardHeader className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-trophy rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {player.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{player.username}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {player.first_name && player.last_name 
                              ? `${player.first_name} ${player.last_name}`
                              : player.email
                            }
                          </p>
                        </div>
                        <Badge className={`${getRatingColor(player.stats.rating)} bg-current/10`}>
                          {player.stats.rating.toFixed(1)}
                        </Badge>
                      </div>

                      {player.preferred_position && (
                        <div className="flex items-center gap-2 mb-4">
                          <PositionIcon className={`h-4 w-4 ${getPositionColor(player.preferred_position)}`} />
                          <span className="text-sm font-medium">{player.preferred_position}</span>
                        </div>
                      )}

                      {player.team && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 bg-gradient-to-r from-stadium to-stadium-light rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              {player.team.abbreviation}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{player.team.name}</span>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="relative">
                      {/* Player Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{player.stats.goals}</div>
                          <div className="text-xs text-muted-foreground">Goals</div>
                        </div>
                        <div className="text-center p-3 bg-trophy/10 rounded-lg">
                          <div className="text-2xl font-bold text-trophy">{player.stats.assists}</div>
                          <div className="text-xs text-muted-foreground">Assists</div>
                        </div>
                        <div className="text-center p-3 bg-stadium/10 rounded-lg">
                          <div className="text-2xl font-bold text-stadium">{player.stats.matches_played}</div>
                          <div className="text-xs text-muted-foreground">Matches</div>
                        </div>
                        <div className="text-center p-3 bg-secondary/10 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{player.stats.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                      </div>

                      {/* Player Info */}
                      <div className="space-y-2 mb-6">
                        {player.country && (
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span>{player.country}</span>
                          </div>
                        )}
                        {player.date_of_birth && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(player.date_of_birth).getFullYear()}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/players/${player.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Profile
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/players/${player.id}/edit`} className="flex items-center gap-2">
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

        {!loading && sortedPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No players found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "No players have been registered yet"}
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-trophy">
              <Link href="/players/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Register First Player
              </Link>
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

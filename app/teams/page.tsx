"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trophy, Award, Users, Search, MapPin, Calendar, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSupabase } from "@/lib/supabase/client"

export default function TeamsPage() {
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchTeams() {
      if (!supabase) {
        // Use mock data when Supabase is not available
        setTeams([
          {
            id: "1",
            name: "Manchester United FC",
            abbreviation: "MUN",
            logo_url: null,
            primary_color: "#DA020E",
            secondary_color: "#FFE500",
            founded_year: 1878,
            home_stadium: "Old Trafford",
            manager_name: "Erik ten Hag",
            is_active: true,
            wins: 15,
            losses: 3,
            draws: 2,
            goals_for: 45,
            goals_against: 18,
            points: 47,
            position: 1,
            players_count: 25,
            awards: [
              { id: "1", name: "Premier League Champions", season: "2023-24", type: "championship" },
              { id: "2", name: "Golden Boot", season: "2023-24", type: "individual" }
            ]
          },
          {
            id: "2",
            name: "Liverpool FC",
            abbreviation: "LIV",
            logo_url: null,
            primary_color: "#C8102E",
            secondary_color: "#F6EB61",
            founded_year: 1892,
            home_stadium: "Anfield",
            manager_name: "Jürgen Klopp",
            is_active: true,
            wins: 14,
            losses: 4,
            draws: 2,
            goals_for: 42,
            goals_against: 20,
            points: 44,
            position: 2,
            players_count: 23,
            awards: [
              { id: "3", name: "FA Cup Winners", season: "2023-24", type: "cup" }
            ]
          },
          {
            id: "3",
            name: "Arsenal FC",
            abbreviation: "ARS",
            logo_url: null,
            primary_color: "#EF0107",
            secondary_color: "#FFFFFF",
            founded_year: 1886,
            home_stadium: "Emirates Stadium",
            manager_name: "Mikel Arteta",
            is_active: true,
            wins: 13,
            losses: 5,
            draws: 2,
            goals_for: 38,
            goals_against: 22,
            points: 41,
            position: 3,
            players_count: 24,
            awards: []
          },
          {
            id: "4",
            name: "Chelsea FC",
            abbreviation: "CHE",
            logo_url: null,
            primary_color: "#034694",
            secondary_color: "#FFFFFF",
            founded_year: 1905,
            home_stadium: "Stamford Bridge",
            manager_name: "Mauricio Pochettino",
            is_active: true,
            wins: 12,
            losses: 6,
            draws: 2,
            goals_for: 35,
            goals_against: 25,
            points: 38,
            position: 4,
            players_count: 26,
            awards: []
          },
          {
            id: "5",
            name: "Manchester City FC",
            abbreviation: "MCI",
            logo_url: null,
            primary_color: "#6CABDD",
            secondary_color: "#FFFFFF",
            founded_year: 1880,
            home_stadium: "Etihad Stadium",
            manager_name: "Pep Guardiola",
            is_active: true,
            wins: 11,
            losses: 7,
            draws: 2,
            goals_for: 40,
            goals_against: 28,
            points: 35,
            position: 5,
            players_count: 22,
            awards: [
              { id: "4", name: "Champions League Winners", season: "2022-23", type: "championship" }
            ]
          },
          {
            id: "6",
            name: "Tottenham Hotspur FC",
            abbreviation: "TOT",
            logo_url: null,
            primary_color: "#132257",
            secondary_color: "#FFFFFF",
            founded_year: 1882,
            home_stadium: "Tottenham Hotspur Stadium",
            manager_name: "Ange Postecoglou",
            is_active: true,
            wins: 10,
            losses: 8,
            draws: 2,
            goals_for: 32,
            goals_against: 30,
            points: 32,
            position: 6,
            players_count: 21,
            awards: []
          }
        ])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Fetch teams with their statistics
        const { data: teamsData, error } = await supabase
          .from("teams")
          .select(`
            *,
            players(count),
            matches_home:wins,
            matches_away:losses
          `)
          .eq("is_active", true)
          .order("name")

        if (error) throw error

        // Transform the data to include calculated stats
        const teamsWithStats = teamsData?.map((team: any) => ({
          ...team,
          players_count: team.players?.[0]?.count || 0,
          wins: Math.floor(Math.random() * 15) + 5, // Mock data for now
          losses: Math.floor(Math.random() * 10) + 2,
          draws: Math.floor(Math.random() * 5) + 1,
          goals_for: Math.floor(Math.random() * 50) + 20,
          goals_against: Math.floor(Math.random() * 30) + 10,
          points: Math.floor(Math.random() * 50) + 20,
          position: Math.floor(Math.random() * 20) + 1,
          awards: [] // Will be populated separately
        })) || []

        setTeams(teamsWithStats)
      } catch (error: any) {
        console.error("Error fetching teams:", error)
        toast({
          title: "Error loading teams",
          description: error.message || "Failed to load teams data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [supabase, toast])

  // Filter teams based on search query
  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Teams
            </h1>
            <p className="text-muted-foreground">
              All teams competing in the FC26 Premier League
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team, index) => (
              <Link key={team.id} href={`/teams/${team.id}`}>
                <motion.div 
                  whileHover={{ y: -5 }} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50">
                    <CardContent className="p-6">
                      {/* Team Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                            style={{ 
                              backgroundColor: team.primary_color || '#3B82F6',
                              color: team.secondary_color || '#FFFFFF'
                            }}
                          >
                            {team.abbreviation}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{team.name}</h3>
                            <p className="text-sm text-muted-foreground">{team.abbreviation}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          #{team.position}
                        </Badge>
                      </div>

                      {/* Team Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{team.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{team.losses}</div>
                          <div className="text-xs text-muted-foreground">Losses</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{team.draws}</div>
                          <div className="text-xs text-muted-foreground">Draws</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{team.points}</div>
                          <div className="text-xs text-muted-foreground">Points</div>
                        </div>
                      </div>

                      {/* Team Info */}
                      <div className="space-y-2 mb-4">
                        {team.home_stadium && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {team.home_stadium}
                          </div>
                        )}
                        {team.manager_name && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-2" />
                            {team.manager_name}
                          </div>
                        )}
                        {team.founded_year && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            Founded {team.founded_year}
                          </div>
                        )}
                      </div>

                      {/* Goals */}
                      <div className="flex justify-between items-center mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-green-600">{team.goals_for}</div>
                          <div className="text-xs text-muted-foreground">Goals For</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-red-600">{team.goals_against}</div>
                          <div className="text-xs text-muted-foreground">Goals Against</div>
                        </div>
                      </div>

                      {/* Awards */}
                      {team.awards && team.awards.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-muted-foreground">
                            {team.awards.length} award{team.awards.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}

                      {/* Players Count */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          {team.players_count} players
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          View Details →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No teams found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
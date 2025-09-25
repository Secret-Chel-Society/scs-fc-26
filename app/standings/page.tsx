"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Users,
  Calendar,
  Award,
  Crown,
  Star
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

export default function StandingsPage() {
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [standings, setStandings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStandings() {
      if (!supabase) {
        // Use mock data when Supabase is not available
        setStandings([
          {
            id: "1",
            team: { name: "Manchester United FC", abbreviation: "MUN", logo_url: null },
            position: 1,
            matches_played: 20,
            wins: 15,
            draws: 3,
            losses: 2,
            goals_for: 45,
            goals_against: 18,
            goal_difference: 27,
            points: 48,
            form: ["W", "W", "W", "D", "W"],
            last_position: 1
          },
          {
            id: "2",
            team: { name: "Liverpool FC", abbreviation: "LIV", logo_url: null },
            position: 2,
            matches_played: 20,
            wins: 14,
            draws: 4,
            losses: 2,
            goals_for: 42,
            goals_against: 20,
            goal_difference: 22,
            points: 46,
            form: ["W", "D", "W", "W", "W"],
            last_position: 2
          },
          {
            id: "3",
            team: { name: "Arsenal FC", abbreviation: "ARS", logo_url: null },
            position: 3,
            matches_played: 20,
            wins: 13,
            draws: 5,
            losses: 2,
            goals_for: 38,
            goals_against: 22,
            goal_difference: 16,
            points: 44,
            form: ["W", "W", "D", "W", "D"],
            last_position: 3
          },
          {
            id: "4",
            team: { name: "Chelsea FC", abbreviation: "CHE", logo_url: null },
            position: 4,
            matches_played: 20,
            wins: 12,
            draws: 6,
            losses: 2,
            goals_for: 35,
            goals_against: 25,
            goal_difference: 10,
            points: 42,
            form: ["W", "D", "W", "D", "W"],
            last_position: 5
          },
          {
            id: "5",
            team: { name: "Manchester City FC", abbreviation: "MCI", logo_url: null },
            position: 5,
            matches_played: 20,
            wins: 11,
            draws: 7,
            losses: 2,
            goals_for: 40,
            goals_against: 28,
            goal_difference: 12,
            points: 40,
            form: ["D", "W", "D", "W", "D"],
            last_position: 4
          },
          {
            id: "6",
            team: { name: "Tottenham Hotspur FC", abbreviation: "TOT", logo_url: null },
            position: 6,
            matches_played: 20,
            wins: 10,
            draws: 8,
            losses: 2,
            goals_for: 32,
            goals_against: 30,
            goal_difference: 2,
            points: 38,
            form: ["D", "D", "W", "D", "W"],
            last_position: 6
          }
        ])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Fetch standings data
        const { data: standingsData, error } = await supabase
          .from("standings")
          .select(`
            *,
            team:teams(name, abbreviation, logo_url)
          `)
          .order("position", { ascending: true })

        if (error) throw error

        setStandings(standingsData || [])
      } catch (error: any) {
        console.error("Error fetching standings:", error)
        toast({
          title: "Error loading standings",
          description: error.message || "Failed to load standings data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStandings()
  }, [supabase, toast])

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{position}</span>
    }
  }

  const getPositionBadge = (position: number, lastPosition: number) => {
    if (position < lastPosition) {
      return <Badge variant="default" className="bg-green-100 text-green-800"><TrendingUp className="h-3 w-3 mr-1" />↑</Badge>
    } else if (position > lastPosition) {
      return <Badge variant="destructive" className="bg-red-100 text-red-800"><TrendingDown className="h-3 w-3 mr-1" />↓</Badge>
    } else {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800"><Minus className="h-3 w-3 mr-1" />-</Badge>
    }
  }

  const getFormColor = (result: string) => {
    switch (result) {
      case "W":
        return "bg-green-500 text-white"
      case "D":
        return "bg-yellow-500 text-white"
      case "L":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            League Standings
          </h1>
          <p className="text-muted-foreground">
            Current standings for the FC26 Premier League
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Premier League Table</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Pos</th>
                      <th className="text-left p-4 font-semibold">Team</th>
                      <th className="text-center p-4 font-semibold">MP</th>
                      <th className="text-center p-4 font-semibold">W</th>
                      <th className="text-center p-4 font-semibold">D</th>
                      <th className="text-center p-4 font-semibold">L</th>
                      <th className="text-center p-4 font-semibold">GF</th>
                      <th className="text-center p-4 font-semibold">GA</th>
                      <th className="text-center p-4 font-semibold">GD</th>
                      <th className="text-center p-4 font-semibold">Pts</th>
                      <th className="text-center p-4 font-semibold">Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team, index) => (
                      <motion.tr
                        key={team.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getPositionIcon(team.position)}
                            {getPositionBadge(team.position, team.last_position)}
                          </div>
                        </td>
                        <td className="p-4">
                          <Link href={`/teams/${team.id}`} className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {team.team.abbreviation}
                            </div>
                            <div>
                              <div className="font-semibold">{team.team.name}</div>
                            </div>
                          </Link>
                        </td>
                        <td className="p-4 text-center font-semibold">{team.matches_played}</td>
                        <td className="p-4 text-center text-green-600 font-semibold">{team.wins}</td>
                        <td className="p-4 text-center text-yellow-600 font-semibold">{team.draws}</td>
                        <td className="p-4 text-center text-red-600 font-semibold">{team.losses}</td>
                        <td className="p-4 text-center font-semibold">{team.goals_for}</td>
                        <td className="p-4 text-center font-semibold">{team.goals_against}</td>
                        <td className="p-4 text-center">
                          <span className={`font-semibold ${team.goal_difference > 0 ? 'text-green-600' : team.goal_difference < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {team.goal_difference > 0 ? '+' : ''}{team.goal_difference}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="default" className="bg-blue-100 text-blue-800 font-bold">
                            {team.points}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex space-x-1 justify-center">
                            {team.form.map((result: string, i: number) => (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(result)}`}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* League Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{standings.reduce((sum, team) => sum + team.goals_for, 0)}</div>
                  <div className="text-sm text-muted-foreground">Total Goals</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{standings.length}</div>
                  <div className="text-sm text-muted-foreground">Teams</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{standings.reduce((sum, team) => sum + team.matches_played, 0)}</div>
                  <div className="text-sm text-muted-foreground">Matches Played</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
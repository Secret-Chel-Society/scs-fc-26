"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  Trophy, 
  Users, 
  Target, 
  Play, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  MapPin,
  Star
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

export default function MatchesPage() {
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    async function fetchMatches() {
      if (!supabase) {
        // Use mock data when Supabase is not available
        setMatches([
          {
            id: "1",
            home_team: { name: "Manchester United FC", abbreviation: "MUN", logo_url: null },
            away_team: { name: "Liverpool FC", abbreviation: "LIV", logo_url: null },
            match_date: "2024-01-15T15:00:00Z",
            status: "scheduled",
            home_score: null,
            away_score: null,
            venue: "Old Trafford",
            competition: "Premier League",
            season: "2023-24"
          },
          {
            id: "2",
            home_team: { name: "Arsenal FC", abbreviation: "ARS", logo_url: null },
            away_team: { name: "Chelsea FC", abbreviation: "CHE", logo_url: null },
            match_date: "2024-01-14T17:30:00Z",
            status: "completed",
            home_score: 2,
            away_score: 1,
            venue: "Emirates Stadium",
            competition: "Premier League",
            season: "2023-24"
          },
          {
            id: "3",
            home_team: { name: "Manchester City FC", abbreviation: "MCI", logo_url: null },
            away_team: { name: "Tottenham Hotspur FC", abbreviation: "TOT", logo_url: null },
            match_date: "2024-01-13T12:00:00Z",
            status: "completed",
            home_score: 3,
            away_score: 0,
            venue: "Etihad Stadium",
            competition: "Premier League",
            season: "2023-24"
          },
          {
            id: "4",
            home_team: { name: "Liverpool FC", abbreviation: "LIV", logo_url: null },
            away_team: { name: "Arsenal FC", abbreviation: "ARS", logo_url: null },
            match_date: "2024-01-20T16:00:00Z",
            status: "scheduled",
            home_score: null,
            away_score: null,
            venue: "Anfield",
            competition: "Premier League",
            season: "2023-24"
          },
          {
            id: "5",
            home_team: { name: "Chelsea FC", abbreviation: "CHE", logo_url: null },
            away_team: { name: "Manchester United FC", abbreviation: "MUN", logo_url: null },
            match_date: "2024-01-19T19:45:00Z",
            status: "scheduled",
            home_score: null,
            away_score: null,
            venue: "Stamford Bridge",
            competition: "Premier League",
            season: "2023-24"
          }
        ])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Fetch matches with team information
        const { data: matchesData, error } = await supabase
          .from("matches")
          .select(`
            *,
            home_team:teams!matches_home_team_id_fkey(name, abbreviation, logo_url),
            away_team:teams!matches_away_team_id_fkey(name, abbreviation, logo_url)
          `)
          .order("match_date", { ascending: true })

        if (error) throw error

        setMatches(matchesData || [])
      } catch (error: any) {
        console.error("Error fetching matches:", error)
        toast({
          title: "Error loading matches",
          description: error.message || "Failed to load matches data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [supabase, toast])

  // Filter matches based on status
  const upcomingMatches = matches.filter(match => match.status === "scheduled")
  const completedMatches = matches.filter(match => match.status === "completed")
  const liveMatches = matches.filter(match => match.status === "live")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>
      case "live":
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><Play className="h-3 w-3 mr-1" />Live</Badge>
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      default:
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Unknown</Badge>
    }
  }

  const MatchCard = ({ match, index }: { match: any, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatDate(match.match_date)}
              </span>
            </div>
            {getStatusBadge(match.status)}
          </div>
          {match.venue && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{match.venue}</span>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {match.home_team.abbreviation}
              </div>
              <div>
                <div className="font-semibold">{match.home_team.name}</div>
                <div className="text-sm text-muted-foreground">Home</div>
              </div>
            </div>

            {/* Score or VS */}
            <div className="flex items-center space-x-4 mx-6">
              {match.status === "completed" ? (
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {match.home_score} - {match.away_score}
                  </div>
                  <div className="text-xs text-muted-foreground">Final</div>
                </div>
              ) : match.status === "live" ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {match.home_score || 0} - {match.away_score || 0}
                  </div>
                  <div className="text-xs text-red-600">Live</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-lg font-semibold text-muted-foreground">VS</div>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center space-x-3 flex-1 justify-end">
              <div>
                <div className="font-semibold text-right">{match.away_team.name}</div>
                <div className="text-sm text-muted-foreground text-right">Away</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {match.away_team.abbreviation}
              </div>
            </div>
          </div>

          {/* Competition */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{match.competition}</span>
            </div>
            <Link href={`/matches/${match.id}`}>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View Details <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Matches
          </h1>
          <p className="text-muted-foreground">
            All matches in the FC26 Premier League
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Upcoming</span>
              <Badge variant="secondary" className="ml-2">{upcomingMatches.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Live</span>
              <Badge variant="destructive" className="ml-2">{liveMatches.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
              <Badge variant="default" className="ml-2">{completedMatches.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : upcomingMatches.length > 0 ? (
              <div className="space-y-4">
                {upcomingMatches.map((match, index) => (
                  <MatchCard key={match.id} match={match} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No upcoming matches</h3>
                <p className="text-muted-foreground">Check back later for new fixtures</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="live" className="mt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : liveMatches.length > 0 ? (
              <div className="space-y-4">
                {liveMatches.map((match, index) => (
                  <MatchCard key={match.id} match={match} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No live matches</h3>
                <p className="text-muted-foreground">No matches are currently being played</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : completedMatches.length > 0 ? (
              <div className="space-y-4">
                {completedMatches.map((match, index) => (
                  <MatchCard key={match.id} match={match} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No completed matches</h3>
                <p className="text-muted-foreground">No matches have been completed yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
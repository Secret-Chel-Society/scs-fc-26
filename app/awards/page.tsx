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
  Medal,
  Award,
  Target,
  Zap,
  Users,
  Calendar,
  TrendingUp,
  Gamepad2,
  Shield,
  Heart,
  Globe,
  Activity,
  BarChart3,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface Award {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  category: "player" | "team" | "season"
  currentWinner?: {
    name: string
    team?: string
    value: string
    avatar?: string
  }
  previousWinners: Array<{
    name: string
    team?: string
    season: string
  }>
}

export default function AwardsPage() {
  const { supabase } = useSupabase()
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "player" | "team" | "season">("all")

  useEffect(() => {
    // Mock awards data - in real implementation, this would come from Supabase
    const mockAwards: Award[] = [
      {
        id: "1",
        name: "Golden Boot",
        description: "Top goal scorer of the season",
        icon: Target,
        color: "text-trophy",
        category: "player",
        currentWinner: {
          name: "Alex Thunder",
          team: "Manchester United FC",
          value: "28 goals",
        },
        previousWinners: [
          { name: "Marcus Rashford", team: "Manchester United FC", season: "2023" },
          { name: "Erling Haaland", team: "Manchester City FC", season: "2022" },
        ],
      },
      {
        id: "2",
        name: "Playmaker of the Year",
        description: "Most assists in the season",
        icon: Zap,
        color: "text-primary",
        category: "player",
        currentWinner: {
          name: "Kevin De Bruyne",
          team: "Manchester City FC",
          value: "18 assists",
        },
        previousWinners: [
          { name: "Bruno Fernandes", team: "Manchester United FC", season: "2023" },
          { name: "Kevin De Bruyne", team: "Manchester City FC", season: "2022" },
        ],
      },
      {
        id: "3",
        name: "Champions Trophy",
        description: "League champions",
        icon: Crown,
        color: "text-trophy",
        category: "team",
        currentWinner: {
          name: "Manchester City FC",
          value: "Premier League Champions",
        },
        previousWinners: [
          { name: "Arsenal FC", season: "2023" },
          { name: "Manchester City FC", season: "2022" },
        ],
      },
      {
        id: "4",
        name: "Golden Glove",
        description: "Best goalkeeper of the season",
        icon: Shield,
        color: "text-blue-500",
        category: "player",
        currentWinner: {
          name: "Alisson Becker",
          team: "Liverpool FC",
          value: "15 clean sheets",
        },
        previousWinners: [
          { name: "Ederson", team: "Manchester City FC", season: "2023" },
          { name: "Alisson Becker", team: "Liverpool FC", season: "2022" },
        ],
      },
      {
        id: "5",
        name: "Young Player of the Year",
        description: "Best player under 23",
        icon: Star,
        color: "text-green-500",
        category: "player",
        currentWinner: {
          name: "Bukayo Saka",
          team: "Arsenal FC",
          value: "22 years old",
        },
        previousWinners: [
          { name: "Phil Foden", team: "Manchester City FC", season: "2023" },
          { name: "Mason Mount", team: "Chelsea FC", season: "2022" },
        ],
      },
      {
        id: "6",
        name: "Fair Play Award",
        description: "Team with best disciplinary record",
        icon: Heart,
        color: "text-green-500",
        category: "team",
        currentWinner: {
          name: "Brighton & Hove Albion",
          value: "Fewest cards",
        },
        previousWinners: [
          { name: "Leicester City", season: "2023" },
          { name: "Brighton & Hove Albion", season: "2022" },
        ],
      },
    ]

    setAwards(mockAwards)
    setLoading(false)
  }, [])

  const filteredAwards = awards.filter(award => 
    selectedCategory === "all" || award.category === selectedCategory
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "player": return Users
      case "team": return Trophy
      case "season": return Calendar
      default: return Award
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "player": return "text-blue-500"
      case "team": return "text-trophy"
      case "season": return "text-primary"
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
                <Trophy className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 Awards
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
              Premier League Honors
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Recognizing excellence in the FC26 Premier League. Celebrate the outstanding 
              achievements of players and teams throughout the season.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { key: "all", label: "All Awards", icon: Award },
              { key: "player", label: "Player Awards", icon: Users },
              { key: "team", label: "Team Awards", icon: Trophy },
              { key: "season", label: "Season Awards", icon: Calendar },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key as any)}
                className={selectedCategory === key ? "bg-gradient-to-r from-primary to-trophy" : ""}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Grid */}
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
            {filteredAwards.map((award, index) => {
              const CategoryIcon = getCategoryIcon(award.category)
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl" />
                    
                    <CardHeader className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-lg bg-current/10 ${award.color}`}>
                          <award.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{award.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <CategoryIcon className={`h-4 w-4 ${getCategoryColor(award.category)}`} />
                            <Badge variant="outline" className={getCategoryColor(award.category)}>
                              {award.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {award.description}
                      </p>

                      {/* Current Winner */}
                      {award.currentWinner && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-trophy/10 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-3 mb-2">
                            <Crown className="h-5 w-5 text-trophy" />
                            <span className="font-semibold text-trophy">Current Winner</span>
                          </div>
                          <div className="text-lg font-bold mb-1">{award.currentWinner.name}</div>
                          {award.currentWinner.team && (
                            <div className="text-sm text-muted-foreground mb-1">
                              {award.currentWinner.team}
                            </div>
                          )}
                          <div className="text-sm font-medium text-primary">
                            {award.currentWinner.value}
                          </div>
                        </div>
                      )}

                      {/* Previous Winners */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Medal className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Previous Winners</span>
                        </div>
                        {award.previousWinners.slice(0, 3).map((winner, i) => (
                          <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                            <div>
                              <div className="font-medium">{winner.name}</div>
                              {winner.team && (
                                <div className="text-xs text-muted-foreground">{winner.team}</div>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {winner.season}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {!loading && filteredAwards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No awards found</h3>
            <p className="text-muted-foreground mb-6">
              No awards match the selected category
            </p>
          </motion.div>
        )}
      </section>
    </div>
  )
}

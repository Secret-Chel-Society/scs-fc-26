"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Users,
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
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface FreeAgent {
  id: string
  username: string
  first_name?: string
  last_name?: string
  avatar_url?: string
  preferred_position?: string
  country?: string
  age?: number
  rating: number
  asking_price: number
  contract_length: number
  status: "available" | "negotiating" | "signed"
  stats: {
    goals: number
    assists: number
    matches_played: number
    rating: number
  }
  previous_team?: string
  transfer_reason: string
  available_until: string
}

export default function FreeAgencyPage() {
  const { supabase } = useSupabase()
  const [freeAgents, setFreeAgents] = useState<FreeAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "available" | "negotiating" | "signed">("all")
  const [sortBy, setSortBy] = useState<"rating" | "price" | "age" | "name">("rating")

  useEffect(() => {
    // Mock free agency data - in real implementation, this would come from Supabase
    const mockFreeAgents: FreeAgent[] = [
      {
        id: "1",
        username: "Alex Thunder",
        first_name: "Alex",
        last_name: "Thunder",
        preferred_position: "Striker",
        country: "England",
        age: 28,
        rating: 9.2,
        asking_price: 50000000,
        contract_length: 3,
        status: "available",
        stats: {
          goals: 25,
          assists: 8,
          matches_played: 32,
          rating: 9.2,
        },
        previous_team: "Manchester United FC",
        transfer_reason: "Contract expired",
        available_until: "2024-07-31",
      },
      {
        id: "2",
        username: "Midfield Maestro",
        first_name: "James",
        last_name: "Rodriguez",
        preferred_position: "Midfielder",
        country: "Colombia",
        age: 32,
        rating: 8.8,
        asking_price: 25000000,
        contract_length: 2,
        status: "negotiating",
        stats: {
          goals: 12,
          assists: 18,
          matches_played: 28,
          rating: 8.8,
        },
        previous_team: "Real Madrid",
        transfer_reason: "Mutual termination",
        available_until: "2024-06-30",
      },
      {
        id: "3",
        username: "Defensive Wall",
        first_name: "Virgil",
        last_name: "Van Dijk",
        preferred_position: "Defender",
        country: "Netherlands",
        age: 33,
        rating: 9.0,
        asking_price: 35000000,
        contract_length: 2,
        status: "available",
        stats: {
          goals: 3,
          assists: 2,
          matches_played: 30,
          rating: 9.0,
        },
        previous_team: "Liverpool FC",
        transfer_reason: "Seeking new challenge",
        available_until: "2024-08-15",
      },
      {
        id: "4",
        username: "Speed Demon",
        first_name: "Kylian",
        last_name: "Mbappe",
        preferred_position: "Striker",
        country: "France",
        age: 25,
        rating: 9.5,
        asking_price: 150000000,
        contract_length: 5,
        status: "available",
        stats: {
          goals: 30,
          assists: 12,
          matches_played: 35,
          rating: 9.5,
        },
        previous_team: "Paris Saint-Germain",
        transfer_reason: "Dream move",
        available_until: "2024-07-31",
      },
      {
        id: "5",
        username: "Playmaker Pro",
        first_name: "Bruno",
        last_name: "Fernandes",
        preferred_position: "Midfielder",
        country: "Portugal",
        age: 29,
        rating: 8.9,
        asking_price: 40000000,
        contract_length: 3,
        status: "signed",
        stats: {
          goals: 15,
          assists: 20,
          matches_played: 33,
          rating: 8.9,
        },
        previous_team: "Manchester United FC",
        transfer_reason: "Contract expired",
        available_until: "2024-07-31",
      },
    ]

    setFreeAgents(mockFreeAgents)
    setLoading(false)
  }, [])

  const filteredAgents = freeAgents.filter(agent => {
    const matchesSearch = agent.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.preferred_position?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch && (filter === "all" || agent.status === filter)
  })

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price":
        return b.asking_price - a.asking_price
      case "age":
        return (a.age || 0) - (b.age || 0)
      case "name":
        return a.username.localeCompare(b.username)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "text-green-500 bg-green-500/10"
      case "negotiating": return "text-yellow-500 bg-yellow-500/10"
      case "signed": return "text-blue-500 bg-blue-500/10"
      default: return "text-muted-foreground bg-muted/10"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return CheckCircle
      case "negotiating": return Clock
      case "signed": return XCircle
      default: return Clock
    }
  }

  const getPositionIcon = (position?: string) => {
    switch (position?.toLowerCase()) {
      case "striker": return Target
      case "midfielder": return Activity
      case "defender": return Shield
      case "goalkeeper": return Crown
      default: return Users
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

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `€${(price / 1000000).toFixed(1)}M`
    }
    return `€${price.toLocaleString()}`
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
                FC26 Free Agency
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
              Transfer Market
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover available players in the FC26 Premier League transfer market. 
              Sign free agents to strengthen your squad for the upcoming season.
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
              <option value="available">Available</option>
              <option value="negotiating">Negotiating</option>
              <option value="signed">Signed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="age">Sort by Age</option>
              <option value="name">Sort by Name</option>
            </select>
          </motion.div>
        </div>
      </section>

      {/* Free Agents Grid */}
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
            {sortedAgents.map((agent, index) => {
              const PositionIcon = getPositionIcon(agent.preferred_position)
              const StatusIcon = getStatusIcon(agent.status)
              
              return (
                <motion.div
                  key={agent.id}
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
                            {agent.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{agent.username}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {agent.first_name && agent.last_name 
                              ? `${agent.first_name} ${agent.last_name}`
                              : agent.preferred_position
                            }
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(agent.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {agent.status}
                        </Badge>
                      </div>

                      {agent.preferred_position && (
                        <div className="flex items-center gap-2 mb-4">
                          <PositionIcon className={`h-4 w-4 ${getPositionColor(agent.preferred_position)}`} />
                          <span className="text-sm font-medium">{agent.preferred_position}</span>
                          {agent.age && (
                            <span className="text-sm text-muted-foreground">• {agent.age} years</span>
                          )}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="relative">
                      {/* Player Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{agent.rating.toFixed(1)}</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                        <div className="text-center p-3 bg-trophy/10 rounded-lg">
                          <div className="text-2xl font-bold text-trophy">{formatPrice(agent.asking_price)}</div>
                          <div className="text-xs text-muted-foreground">Asking Price</div>
                        </div>
                        <div className="text-center p-3 bg-stadium/10 rounded-lg">
                          <div className="text-2xl font-bold text-stadium">{agent.stats.goals}</div>
                          <div className="text-xs text-muted-foreground">Goals</div>
                        </div>
                        <div className="text-center p-3 bg-secondary/10 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{agent.stats.assists}</div>
                          <div className="text-xs text-muted-foreground">Assists</div>
                        </div>
                      </div>

                      {/* Contract Details */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Contract Length:</span>
                          <span className="font-medium">{agent.contract_length} years</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Previous Team:</span>
                          <span className="font-medium">{agent.previous_team || "N/A"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Available Until:</span>
                          <span className="font-medium">{new Date(agent.available_until).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Transfer Reason */}
                      <div className="mb-6 p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm font-medium mb-1">Transfer Reason</div>
                        <div className="text-sm text-muted-foreground">{agent.transfer_reason}</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {agent.status === "available" ? (
                          <Button className="flex-1 bg-gradient-to-r from-primary to-trophy">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Make Offer
                          </Button>
                        ) : agent.status === "negotiating" ? (
                          <Button variant="outline" className="flex-1" disabled>
                            <Clock className="h-4 w-4 mr-2" />
                            Negotiating
                          </Button>
                        ) : (
                          <Button variant="outline" className="flex-1" disabled>
                            <XCircle className="h-4 w-4 mr-2" />
                            Signed
                          </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/players/${agent.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
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

        {!loading && sortedAgents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No free agents found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "No free agents are currently available"}
            </p>
          </motion.div>
        )}
      </section>
    </div>
  )
}

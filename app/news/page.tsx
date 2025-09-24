"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Newspaper,
  Calendar,
  User,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Trophy,
  Users,
  Target,
  Zap,
  Crown,
  Shield,
  Star,
  Activity,
  BarChart3,
  Gamepad2,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  author_avatar?: string
  category: "transfer" | "match" | "award" | "league" | "general"
  featured_image?: string
  published_at: string
  updated_at: string
  views: number
  likes: number
  comments: number
  is_featured: boolean
  tags: string[]
}

export default function NewsPage() {
  const { supabase } = useSupabase()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "transfer" | "match" | "award" | "league" | "general">("all")
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest")

  useEffect(() => {
    // Mock news data - in real implementation, this would come from Supabase
    const mockArticles: NewsArticle[] = [
      {
        id: "1",
        title: "FC26 Premier League Season 2024 Kicks Off with Spectacular Opening Ceremony",
        excerpt: "The new season begins with record-breaking attendance and thrilling opening matches across all divisions.",
        content: "The FC26 Premier League officially launched its 2024 season with an incredible opening ceremony...",
        author: "League Reporter",
        category: "league",
        published_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        views: 15420,
        likes: 892,
        comments: 156,
        is_featured: true,
        tags: ["season", "opening", "ceremony"],
      },
      {
        id: "2",
        title: "Manchester City FC Signs Star Striker Alex Thunder for €50M",
        excerpt: "The defending champions make a major statement with the signing of the league's top scorer.",
        content: "Manchester City FC has completed the signing of Alex Thunder from Manchester United...",
        author: "Transfer Insider",
        category: "transfer",
        published_at: "2024-01-14T15:30:00Z",
        updated_at: "2024-01-14T15:30:00Z",
        views: 12850,
        likes: 654,
        comments: 203,
        is_featured: true,
        tags: ["transfer", "manchester-city", "alex-thunder"],
      },
      {
        id: "3",
        title: "Arsenal FC Defeats Liverpool FC 3-1 in Thrilling Derby Match",
        excerpt: "A stunning comeback victory sees Arsenal climb to second place in the league standings.",
        content: "Arsenal FC produced a remarkable second-half performance to overcome Liverpool FC...",
        author: "Match Reporter",
        category: "match",
        published_at: "2024-01-13T20:45:00Z",
        updated_at: "2024-01-13T20:45:00Z",
        views: 9870,
        likes: 423,
        comments: 89,
        is_featured: false,
        tags: ["match", "arsenal", "liverpool", "derby"],
      },
      {
        id: "4",
        title: "Golden Boot Award Goes to Kylian Mbappe for Record-Breaking Season",
        excerpt: "The French striker becomes the youngest player to win the prestigious award in FC26 history.",
        content: "Kylian Mbappe has been awarded the Golden Boot for his outstanding performance...",
        author: "Awards Committee",
        category: "award",
        published_at: "2024-01-12T12:00:00Z",
        updated_at: "2024-01-12T12:00:00Z",
        views: 11200,
        likes: 756,
        comments: 134,
        is_featured: false,
        tags: ["award", "golden-boot", "kylian-mbappe"],
      },
      {
        id: "5",
        title: "New Transfer Window Opens with Record-Breaking Spending Expected",
        excerpt: "Teams prepare for the biggest transfer window in FC26 Premier League history.",
        content: "The January transfer window has officially opened with clubs expected to spend...",
        author: "Transfer Analyst",
        category: "transfer",
        published_at: "2024-01-11T09:00:00Z",
        updated_at: "2024-01-11T09:00:00Z",
        views: 8750,
        likes: 312,
        comments: 67,
        is_featured: false,
        tags: ["transfer", "window", "spending"],
      },
      {
        id: "6",
        title: "FC26 Premier League Announces Partnership with EA Sports",
        excerpt: "The league enters into an official partnership with EA Sports for enhanced gaming experience.",
        content: "FC26 Premier League is proud to announce a groundbreaking partnership...",
        author: "League Official",
        category: "league",
        published_at: "2024-01-10T14:20:00Z",
        updated_at: "2024-01-10T14:20:00Z",
        views: 15600,
        likes: 1024,
        comments: 189,
        is_featured: true,
        tags: ["partnership", "ea-sports", "gaming"],
      },
    ]

    setArticles(mockArticles)
    setLoading(false)
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesSearch && (filter === "all" || article.category === filter)
  })

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      case "popular":
        return b.views - a.views
      case "trending":
        return (b.likes + b.comments) - (a.likes + a.comments)
      default:
        return 0
    }
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transfer": return Users
      case "match": return Target
      case "award": return Trophy
      case "league": return Crown
      case "general": return Newspaper
      default: return Newspaper
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "transfer": return "text-blue-500"
      case "match": return "text-red-500"
      case "award": return "text-trophy"
      case "league": return "text-primary"
      case "general": return "text-muted-foreground"
      default: return "text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const featuredArticles = sortedArticles.filter(article => article.is_featured)
  const regularArticles = sortedArticles.filter(article => !article.is_featured)

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
                <Newspaper className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold league-title">
                FC26 News
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
              Latest League News
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, transfers, match results, and league updates 
              from the FC26 Premier League.
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
                placeholder="Search news..."
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
              <option value="all">All News</option>
              <option value="transfer">Transfers</option>
              <option value="match">Matches</option>
              <option value="award">Awards</option>
              <option value="league">League</option>
              <option value="general">General</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-primary/20 rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-trophy" />
              Featured News
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 2).map((article, index) => {
                const CategoryIcon = getCategoryIcon(article.category)
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl" />
                      
                      <CardHeader className="relative">
                        <div className="flex items-center gap-2 mb-4">
                          <CategoryIcon className={`h-4 w-4 ${getCategoryColor(article.category)}`} />
                          <Badge className={getCategoryColor(article.category)}>
                            {article.category}
                          </Badge>
                          <Badge variant="outline" className="border-trophy text-trophy">
                            Featured
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                        <p className="text-muted-foreground leading-relaxed">
                          {article.excerpt}
                        </p>
                      </CardHeader>

                      <CardContent className="relative">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(article.published_at)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{article.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{article.comments}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/news/${article.id}`} className="flex items-center gap-2">
                              Read More
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            Latest News
          </h3>
        </motion.div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-muted rounded w-20"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                        <div className="h-4 bg-muted rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {regularArticles.map((article, index) => {
              const CategoryIcon = getCategoryIcon(article.category)
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="border-primary/20 bg-gradient-to-r from-background to-primary/5 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-trophy rounded-lg flex items-center justify-center">
                          <CategoryIcon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CategoryIcon className={`h-4 w-4 ${getCategoryColor(article.category)}`} />
                            <Badge className={getCategoryColor(article.category)}>
                              {article.category}
                            </Badge>
                          </div>
                          <h4 className="text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                            {article.title}
                          </h4>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{article.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(article.published_at)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{article.likes}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/news/${article.id}`} className="flex items-center gap-2">
                                Read More
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
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

        {!loading && sortedArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Newspaper className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No news found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "No news articles are available yet"}
            </p>
          </motion.div>
        )}
      </section>
    </div>
  )
}

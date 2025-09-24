"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Trophy,
  Users,
  Calendar,
  Target,
  Zap,
  Star,
  Gamepad2,
  BarChart3,
  Shield,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Crown,
  Medal,
  Activity,
  GamepadIcon,
  TargetIcon,
  BarChartIcon,
  UsersIcon,
  CalendarIcon,
  TrophyIcon,
  ArrowRight,
  Play,
  ChevronRight,
  Sparkles,
  Flame,
  Sword,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, setRef] = useState<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [end, duration, ref])

  return (
    <span ref={setRef}>
      {count}
      {suffix}
    </span>
  )
}

export default function HomePage() {
  const { supabase } = useSupabase()
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalTeams: 0,
    totalMatches: 0,
    activeSeasons: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) {
        // Use mock data when Supabase is not available
        setStats({
          totalPlayers: 1250,
          totalTeams: 20,
          totalMatches: 380,
          activeSeasons: 1,
        })
        setLoading(false)
        return
      }

      try {
        const [playersRes, teamsRes, matchesRes, seasonsRes] = await Promise.all([
          supabase.from("users").select("id", { count: "exact" }),
          supabase.from("teams").select("id", { count: "exact" }).eq("is_active", true),
          supabase.from("matches").select("id", { count: "exact" }),
          supabase.from("seasons").select("id", { count: "exact" }).eq("is_active", true),
        ])

        setStats({
          totalPlayers: playersRes.count || 0,
          totalTeams: teamsRes.count || 0,
          totalMatches: matchesRes.count || 0,
          activeSeasons: seasonsRes.count || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Use mock data on error
        setStats({
          totalPlayers: 1250,
          totalTeams: 20,
          totalMatches: 380,
          activeSeasons: 1,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            {/* Logo and Title */}
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <GamepadIcon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <TrophyIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </motion.div>
              
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
                >
                  FC26 Premier League
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl sm:text-2xl text-blue-200 font-medium"
                >
                  The Ultimate EA Sports FC 26 Experience
                </motion.p>
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Experience the most competitive EA Sports FC 26 football league with professional-grade statistics tracking, 
                advanced team management, and thrilling championship tournaments.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  "Professional Statistics",
                  "Team Management", 
                  "Championship Tournaments",
                  "Real-time Updates"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-6 h-6 mr-3" />
                Join the League
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-bold text-white hover:border-white/50 transition-all duration-300"
              >
                <Calendar className="w-6 h-6 mr-3" />
                View Matches
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              League Statistics
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real-time data from our competitive football league
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Active Players", value: stats.totalPlayers, color: "from-blue-500 to-cyan-500" },
              { icon: Trophy, label: "Teams", value: stats.totalTeams, color: "from-purple-500 to-pink-500" },
              { icon: Calendar, label: "Matches Played", value: stats.totalMatches, color: "from-green-500 to-emerald-500" },
              { icon: Award, label: "Active Seasons", value: stats.activeSeasons, color: "from-orange-500 to-red-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      <AnimatedCounter end={stat.value} />
                    </div>
                    <div className="text-gray-300 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose FC26 Premier League?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the most advanced football league management platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Advanced Statistics",
                description: "Comprehensive player and team analytics with real-time performance tracking",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Fair Play System",
                description: "Anti-cheat measures and fair play policies ensure competitive integrity",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Trophy,
                title: "Championship Tournaments",
                description: "Regular tournaments with prizes and recognition for top performers",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Advanced team building tools and player transfer systems",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Clock,
                title: "Real-time Updates",
                description: "Live match tracking and instant notifications for all league activities",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Globe,
                title: "Global Community",
                description: "Connect with players worldwide and participate in international competitions",
                color: "from-teal-500 to-blue-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group h-full">
                  <CardContent className="p-8">
                    <div className={`w-12 h-12 mb-6 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Ready to Join the League?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start your journey in the most competitive EA Sports FC 26 league today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Crown className="w-6 h-6 mr-3" />
                Join FC26 Premier League
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm px-12 py-4 text-xl font-bold text-white hover:border-white/50 transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch Highlights
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
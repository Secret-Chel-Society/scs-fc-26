"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  User,
  Shield,
  Gamepad2,
  Target,
  Star,
  Zap,
  Newspaper,
} from "lucide-react"
import { useSupabase } from "@/lib/supabase/client"

const Navigation = () => {
  const pathname = usePathname()
  const { supabase, user } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            FC26 Premier League
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActive("/") ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Trophy className="mr-2 h-4 w-4" />
                League
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/standings"
                      >
                        <Trophy className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">League Standings</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Current season standings and team rankings
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/teams"
                      >
                        <div className="text-sm font-medium leading-none">Teams</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View all teams and their rosters
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/players"
                      >
                        <div className="text-sm font-medium leading-none">Players</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Player statistics and profiles
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Calendar className="mr-2 h-4 w-4" />
                Matches
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/matches"
                      >
                        <Calendar className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">All Matches</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          View upcoming and completed matches
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/matches?status=scheduled"
                      >
                        <div className="text-sm font-medium leading-none">Upcoming</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Scheduled matches
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/matches?status=completed"
                      >
                        <div className="text-sm font-medium leading-none">Results</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Match results and statistics
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistics
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/statistics"
                      >
                        <BarChart3 className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">Player Stats</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Detailed player and team statistics
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/statistics/players"
                      >
                        <div className="text-sm font-medium leading-none">Top Players</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Leading goal scorers and assists
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/statistics/teams"
                      >
                        <div className="text-sm font-medium leading-none">Team Stats</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Team performance metrics
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Trophy className="mr-2 h-4 w-4" />
                Awards
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/awards"
                      >
                        <Trophy className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">League Awards</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Player and team honors
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/awards?category=player"
                      >
                        <div className="text-sm font-medium leading-none">Player Awards</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Individual achievements
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/awards?category=team"
                      >
                        <div className="text-sm font-medium leading-none">Team Awards</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Team accomplishments
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Users className="mr-2 h-4 w-4" />
                Transfers
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/free-agency"
                      >
                        <Users className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">Free Agency</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Available players and transfers
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/free-agency?status=available"
                      >
                        <div className="text-sm font-medium leading-none">Available</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Players ready to sign
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/free-agency?status=negotiating"
                      >
                        <div className="text-sm font-medium leading-none">Negotiating</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Ongoing negotiations
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Newspaper className="mr-2 h-4 w-4" />
                News
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/news"
                      >
                        <Newspaper className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">Latest News</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          League updates and announcements
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/news?category=transfer"
                      >
                        <div className="text-sm font-medium leading-none">Transfers</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Transfer news and rumors
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/news?category=match"
                      >
                        <div className="text-sm font-medium leading-none">Matches</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Match reports and analysis
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {user && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  Management
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/dashboard"
                        >
                          <Users className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">Dashboard</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Manage your team and players
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/management/lineup"
                        >
                          <div className="text-sm font-medium leading-none">Lineup</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Set your starting XI
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/management/transfers"
                        >
                          <div className="text-sm font-medium leading-none">Transfers</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Buy and sell players
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                {user.user_metadata?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoading ? "Signing out..." : "Sign out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                <Link href="/register" className="flex items-center">
                  <Zap className="mr-2 h-4 w-4" />
                  Join League
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation

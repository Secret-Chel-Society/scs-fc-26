import Link from "next/link"
import { Gamepad2, Trophy, Users, Calendar, BarChart3, Mail, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-trophy">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-trophy bg-clip-text text-transparent">
                FC26 Clubs
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The premier EA Sports FC 26 competitive football league with advanced 
              statistics tracking and professional team management.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* League */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">League</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/standings" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Standings
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/players" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Players
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Statistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Matches */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Matches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/matches" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  All Matches
                </Link>
              </li>
              <li>
                <Link href="/matches?status=scheduled" className="text-muted-foreground hover:text-primary transition-colors">
                  Upcoming
                </Link>
              </li>
              <li>
                <Link href="/matches?status=completed" className="text-muted-foreground hover:text-primary transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/matches?featured=true" className="text-muted-foreground hover:text-primary transition-colors">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-muted-foreground hover:text-primary transition-colors">
                  League Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 FC26 Clubs. All rights reserved. Built for EA Sports FC 26 competitive gaming.</p>
        </div>
      </div>
    </footer>
  )
}

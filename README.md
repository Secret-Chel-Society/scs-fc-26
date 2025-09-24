# FC26 Premier League - EA Sports FC 26 Competitive Platform

A modern, competitive football league platform built for EA Sports FC 26 with advanced statistics tracking, team management, and professional tournaments.

## 🏆 Features

- **Advanced Statistics**: Real-time tracking of goals, assists, passes, tackles, and advanced metrics
- **Team Management**: Complete club management with transfers, contracts, and formations
- **Match Scheduling**: Professional tournament scheduling and live match tracking
- **Player Profiles**: Detailed player statistics and performance analytics
- **League Standings**: Real-time standings and championship tracking
- **Modern UI**: Beautiful, responsive design with dark/light theme support
- **Real-time Updates**: Live statistics and match updates
- **Mobile Responsive**: Optimized for all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fc26-premier-league.git
   cd fc26-premier-league
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL schema from `schema_supabase.sql` in your Supabase SQL editor
   - Optionally load sample data from `sample_data.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)

1. Create a new Supabase project
2. Go to the SQL Editor
3. Run the contents of `schema_supabase.sql`
4. Optionally run `sample_data.sql` for test data

### Option 2: Local PostgreSQL

1. Install PostgreSQL
2. Create a database: `createdb fc26_premier_league`
3. Run: `psql -d fc26_premier_league -f schema_supabase.sql`
4. Optionally run: `psql -d fc26_premier_league -f sample_data.sql`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Set environment variables**
   - Add your Supabase credentials in Vercel dashboard
   - Set `NEXT_PUBLIC_SUPABASE_URL`
   - Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🎮 Usage

### For Players
1. **Register**: Create an account and join the league
2. **Join a Team**: Get recruited or create your own team
3. **Play Matches**: Participate in scheduled matches
4. **Track Stats**: View your performance statistics
5. **Manage Profile**: Update your player information

### For Team Managers
1. **Team Management**: Manage your squad and formations
2. **Transfers**: Buy and sell players in the transfer market
3. **Match Planning**: Set lineups and tactics
4. **Statistics**: Analyze team and player performance

### For Administrators
1. **League Management**: Manage seasons, teams, and players
2. **Match Scheduling**: Schedule and manage matches
3. **Statistics**: Access comprehensive league analytics
4. **User Management**: Moderate users and teams

## 📊 Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Player accounts and profiles
- **Teams**: Football clubs and their information
- **Players**: Player profiles linked to users and teams
- **Matches**: Game scheduling and results
- **Statistics**: Detailed performance metrics
- **Seasons**: League seasons and tournaments
- **Transfers**: Player movement between teams

## 🎨 Customization

### Themes
The application supports both light and dark themes. You can customize colors in `tailwind.config.ts`:

```typescript
colors: {
  pitch: {
    DEFAULT: "#22c55e", // Green pitch
    dark: "#16a34a",
    light: "#4ade80",
  },
  stadium: {
    DEFAULT: "#1e40af", // Stadium blue
    dark: "#1e3a8a", 
    light: "#3b82f6",
  },
  trophy: {
    DEFAULT: "#f59e0b", // Gold trophy
    dark: "#d97706",
    light: "#fbbf24",
  },
}
```

### Components
All UI components are built with Radix UI and can be customized in the `components/ui/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features on GitHub Issues
- **Discord**: Join our community Discord server
- **Email**: Contact us at support@fc26clubs.com

## 🙏 Acknowledgments

- Built for the EA Sports FC 26 competitive gaming community
- Inspired by professional football league management systems
- Uses modern web technologies for optimal performance

---

**FC26 Premier League** - Where competitive EA Sports FC 26 meets professional league management! ⚽🏆
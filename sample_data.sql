-- Sample Data for SCS FC 26 Database
-- This file contains sample data to populate the database for testing

-- Insert sample conferences
INSERT INTO conferences (id, name, description, color) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Eastern Conference', 'Eastern Conference teams', '#FF6B6B'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Western Conference', 'Western Conference teams', '#4ECDC4');

-- Insert sample teams
INSERT INTO teams (id, name, conference_id, wins, losses, otl, goals_for, goals_against, points) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Toronto Maple Leafs', '550e8400-e29b-41d4-a716-446655440001', 15, 8, 2, 85, 72, 32),
  ('660e8400-e29b-41d4-a716-446655440002', 'Montreal Canadiens', '550e8400-e29b-41d4-a716-446655440001', 12, 10, 3, 78, 80, 27),
  ('660e8400-e29b-41d4-a716-446655440003', 'Vancouver Canucks', '550e8400-e29b-41d4-a716-446655440002', 18, 5, 1, 95, 65, 37),
  ('660e8400-e29b-41d4-a716-446655440004', 'Calgary Flames', '550e8400-e29b-41d4-a716-446655440002', 14, 9, 2, 82, 75, 30);

-- Insert sample users
INSERT INTO users (id, email, gamer_tag_id, discord_name, primary_position, console, username, gamer_tag) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'john.doe@example.com', 'johndoe123', 'JohnDoe#1234', 'Center', 'Xbox', 'johndoe', 'JohnDoe'),
  ('770e8400-e29b-41d4-a716-446655440002', 'jane.smith@example.com', 'janesmith456', 'JaneSmith#5678', 'Defenseman', 'PS5', 'janesmith', 'JaneSmith'),
  ('770e8400-e29b-41d4-a716-446655440003', 'mike.johnson@example.com', 'mikejohnson789', 'MikeJohnson#9012', 'Goalie', 'Xbox', 'mikejohnson', 'MikeJohnson'),
  ('770e8400-e29b-41d4-a716-446655440004', 'sarah.wilson@example.com', 'sarahwilson012', 'SarahWilson#3456', 'Wing', 'PS5', 'sarahwilson', 'SarahWilson');

-- Insert sample players
INSERT INTO players (id, user_id, team_id, salary, role, status) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 5000000, 'Player', 'active'),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 4500000, 'GM', 'active'),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 6000000, 'Player', 'active'),
  ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440003', 4200000, 'Player', 'active');

-- Insert sample seasons
INSERT INTO seasons (id, name, start_date, end_date, is_active, season_number) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'Season 26', '2024-01-01 00:00:00+00', '2024-12-31 23:59:59+00', true, 26),
  ('990e8400-e29b-41d4-a716-446655440002', 'Season 25', '2023-01-01 00:00:00+00', '2023-12-31 23:59:59+00', false, 25);

-- Insert sample matches
INSERT INTO matches (id, home_team_id, away_team_id, home_score, away_score, match_date, status, season_id) VALUES
  ('aa0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', 4, 2, '2024-01-15 19:00:00+00', 'Completed', '990e8400-e29b-41d4-a716-446655440001'),
  ('aa0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', 3, 1, '2024-01-16 20:00:00+00', 'Completed', '990e8400-e29b-41d4-a716-446655440001'),
  ('aa0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', 0, 0, '2024-01-20 19:30:00+00', 'Scheduled', '990e8400-e29b-41d4-a716-446655440001');

-- Insert sample forum categories
INSERT INTO forum_categories (id, name, description, color) VALUES
  ('bb0e8400-e29b-41d4-a716-446655440001', 'General Discussion', 'General league discussion', '#3B82F6'),
  ('bb0e8400-e29b-41d4-a716-446655440002', 'Trade Talk', 'Trade discussions and proposals', '#10B981'),
  ('bb0e8400-e29b-41d4-a716-446655440003', 'Match Results', 'Match results and analysis', '#F59E0B'),
  ('bb0e8400-e29b-41d4-a716-446655440004', 'Announcements', 'League announcements', '#EF4444');

-- Insert sample forum posts
INSERT INTO forum_posts (id, title, content, author_id, category_id, pinned) VALUES
  ('cc0e8400-e29b-41d4-a716-446655440001', 'Welcome to Season 26!', 'Welcome everyone to the start of Season 26! Good luck to all teams.', '770e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440004', true),
  ('cc0e8400-e29b-41d4-a716-446655440002', 'Trade Block - Looking for Defense', 'Our team is looking to trade for a top-pairing defenseman. PM me if interested.', '770e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440002', false),
  ('cc0e8400-e29b-41d4-a716-446655440003', 'Great game last night!', 'What a thrilling match between Toronto and Montreal!', '770e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440003', false);

-- Insert sample ELO players
INSERT INTO elo_players (id, discord_id, discord_username, display_name, position, elo_rating) VALUES
  ('dd0e8400-e29b-41d4-a716-446655440001', '123456789012345678', 'JohnDoe#1234', 'John Doe', 'Center', 1250),
  ('dd0e8400-e29b-41d4-a716-446655440002', '234567890123456789', 'JaneSmith#5678', 'Jane Smith', 'Defenseman', 1180),
  ('dd0e8400-e29b-41d4-a716-446655440003', '345678901234567890', 'MikeJohnson#9012', 'Mike Johnson', 'Goalie', 1320),
  ('dd0e8400-e29b-41d4-a716-446655440004', '456789012345678901', 'SarahWilson#3456', 'Sarah Wilson', 'Wing', 1200);

-- Insert sample news articles
INSERT INTO news (id, title, content, author_id, published, featured, excerpt) VALUES
  ('ee0e8400-e29b-41d4-a716-446655440001', 'Season 26 Draft Results', 'The Season 26 draft has concluded with some exciting picks...', '770e8400-e29b-41d4-a716-446655440001', true, true, 'Season 26 draft results are in!'),
  ('ee0e8400-e29b-41d4-a716-446655440002', 'Trade Deadline Approaching', 'The trade deadline is just one week away. Teams are making their final moves...', '770e8400-e29b-41d4-a716-446655440002', true, false, 'Trade deadline is approaching fast!');

-- Insert sample roles
INSERT INTO roles (id, name, display_name, description, level, is_system_role) VALUES
  ('ff0e8400-e29b-41d4-a716-446655440001', 'admin', 'Administrator', 'Full system access', 100, true),
  ('ff0e8400-e29b-41d4-a716-446655440002', 'moderator', 'Moderator', 'Forum and content moderation', 50, true),
  ('ff0e8400-e29b-41d4-a716-446655440003', 'player', 'Player', 'Standard player access', 10, true);

-- Insert sample permissions
INSERT INTO permissions (id, name, description, resource, action) VALUES
  ('gg0e8400-e29b-41d4-a716-446655440001', 'manage_users', 'Manage user accounts', 'users', 'manage'),
  ('gg0e8400-e29b-41d4-a716-446655440002', 'manage_teams', 'Manage team rosters', 'teams', 'manage'),
  ('gg0e8400-e29b-41d4-a716-446655440003', 'moderate_forum', 'Moderate forum content', 'forum', 'moderate'),
  ('gg0e8400-e29b-41d4-a716-446655440004', 'view_analytics', 'View system analytics', 'analytics', 'view');

-- Insert sample role permissions
INSERT INTO role_permissions (id, role_id, permission_id) VALUES
  ('hh0e8400-e29b-41d4-a716-446655440001', 'ff0e8400-e29b-41d4-a716-446655440001', 'gg0e8400-e29b-41d4-a716-446655440001'),
  ('hh0e8400-e29b-41d4-a716-446655440002', 'ff0e8400-e29b-41d4-a716-446655440001', 'gg0e8400-e29b-41d4-a716-446655440002'),
  ('hh0e8400-e29b-41d4-a716-446655440003', 'ff0e8400-e29b-41d4-a716-446655440002', 'gg0e8400-e29b-41d4-a716-446655440003'),
  ('hh0e8400-e29b-41d4-a716-446655440004', 'ff0e8400-e29b-41d4-a716-446655440001', 'gg0e8400-e29b-41d4-a716-446655440004');

-- Insert sample user roles
INSERT INTO user_roles (id, user_id, role, role_id) VALUES
  ('ii0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Admin', 'ff0e8400-e29b-41d4-a716-446655440001'),
  ('ii0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'Player', 'ff0e8400-e29b-41d4-a716-446655440003'),
  ('ii0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'Player', 'ff0e8400-e29b-41d4-a716-446655440003'),
  ('ii0e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', 'Player', 'ff0e8400-e29b-41d4-a716-446655440003');

-- Insert sample books (for Bible study features)
INSERT INTO books (id, name, chapters) VALUES
  (1, 'Genesis', 50),
  (2, 'Exodus', 40),
  (3, 'Leviticus', 27),
  (4, 'Numbers', 36),
  (5, 'Deuteronomy', 34),
  (6, 'Joshua', 24),
  (7, 'Judges', 21),
  (8, 'Ruth', 4),
  (9, '1 Samuel', 31),
  (10, '2 Samuel', 24);

-- Insert sample system settings
INSERT INTO system_settings (id, key, value) VALUES
  (1, 'league_name', '"SCS FC 26"'),
  (2, 'season_length_weeks', '20'),
  (3, 'trade_deadline_week', '15'),
  (4, 'playoff_teams', '8'),
  (5, 'max_roster_size', '25');

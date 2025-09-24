-- Database Schema for SCS FC 26 Sports League Management System
-- This schema creates all tables, constraints, and relationships

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sequences
CREATE SEQUENCE IF NOT EXISTS daily_recaps_id_seq;
CREATE SEQUENCE IF NOT EXISTS forum_replies_id_seq;
CREATE SEQUENCE IF NOT EXISTS forum_threads_id_seq;
CREATE SEQUENCE IF NOT EXISTS goalie_stats_id_seq;
CREATE SEQUENCE IF NOT EXISTS player_stats_id_seq;
CREATE SEQUENCE IF NOT EXISTS system_settings_id_seq;

-- Admin Actions Table
CREATE TABLE public.admin_actions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  action_type character varying NOT NULL,
  target_id uuid,
  admin_user_id uuid,
  details jsonb,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT admin_actions_pkey PRIMARY KEY (id),
  CONSTRAINT admin_actions_admin_user_id_fkey FOREIGN KEY (admin_user_id) REFERENCES auth.users(id)
);

-- Analytics Events Table
CREATE TABLE public.analytics_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid,
  session_id text NOT NULL,
  ip_address text,
  user_agent text,
  metadata jsonb,
  timestamp timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT analytics_events_pkey PRIMARY KEY (id),
  CONSTRAINT analytics_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Audit Logs Table
CREATE TABLE public.audit_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  action text NOT NULL,
  user_id uuid NOT NULL,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT audit_logs_pkey PRIMARY KEY (id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Books Table
CREATE TABLE public.books (
  id integer NOT NULL,
  name text NOT NULL,
  chapters integer NOT NULL,
  CONSTRAINT books_pkey PRIMARY KEY (id)
);

-- Carousel Images Table
CREATE TABLE public.carousel_images (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  url text NOT NULL,
  title text NOT NULL,
  subtitle text,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT carousel_images_pkey PRIMARY KEY (id)
);

-- Code Downloads Table
CREATE TABLE public.code_downloads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  file_type text NOT NULL,
  filename text NOT NULL,
  file_path text,
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  referer text,
  session_id text,
  user_id uuid,
  timestamp timestamp with time zone DEFAULT now(),
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT code_downloads_pkey PRIMARY KEY (id),
  CONSTRAINT code_downloads_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Conferences Table
CREATE TABLE public.conferences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  description text,
  color character varying DEFAULT '#6366f1'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  CONSTRAINT conferences_pkey PRIMARY KEY (id)
);

-- Daily Recaps Table
CREATE TABLE public.daily_recaps (
  id integer NOT NULL DEFAULT nextval('daily_recaps_id_seq'::regclass),
  date date NOT NULL UNIQUE,
  recap_data jsonb NOT NULL CHECK (recap_data ? 'team_recaps'::text AND jsonb_typeof(recap_data -> 'team_recaps'::text) = 'array'::text),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT daily_recaps_pkey PRIMARY KEY (id)
);

-- Discord Bot Config Table
CREATE TABLE public.discord_bot_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() CHECK (id IS NOT NULL),
  guild_id character varying NOT NULL,
  bot_token text NOT NULL,
  registered_role_id character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT discord_bot_config_pkey PRIMARY KEY (id)
);

-- Discord Team Roles Table
CREATE TABLE public.discord_team_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL UNIQUE,
  discord_role_id character varying NOT NULL,
  role_name character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT discord_team_roles_pkey PRIMARY KEY (id),
  CONSTRAINT discord_team_roles_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

-- Discord Users Table
CREATE TABLE public.discord_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  discord_id character varying NOT NULL UNIQUE,
  discord_username character varying NOT NULL,
  discord_discriminator character varying,
  discord_avatar character varying,
  access_token text,
  refresh_token text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT discord_users_pkey PRIMARY KEY (id),
  CONSTRAINT discord_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- EA Match Data Table
CREATE TABLE public.ea_match_data (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  match_id text NOT NULL UNIQUE,
  data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ea_match_data_pkey PRIMARY KEY (id)
);

-- EA Player Mappings Table
CREATE TABLE public.ea_player_mappings (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  ea_player_id text NOT NULL UNIQUE,
  user_id uuid,
  player_name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ea_player_mappings_pkey PRIMARY KEY (id),
  CONSTRAINT ea_player_mappings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- EA Player Stats Table
CREATE TABLE public.ea_player_stats (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  match_id uuid,
  ea_match_id text NOT NULL,
  player_name text NOT NULL,
  player_id text,
  team_id uuid,
  goals integer DEFAULT 0,
  assists integer DEFAULT 0,
  shots integer DEFAULT 0,
  hits integer DEFAULT 0,
  pim integer DEFAULT 0,
  plus_minus integer DEFAULT 0,
  blocks integer DEFAULT 0,
  faceoff_pct numeric,
  toi text,
  giveaways integer DEFAULT 0,
  takeaways integer DEFAULT 0,
  passing_pct numeric,
  save_pct numeric,
  saves integer DEFAULT 0,
  goals_against integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  position character varying,
  shot_attempts integer,
  shot_pct numeric,
  pass_attempts integer,
  pass_complete integer,
  defensive_zone_time integer,
  offensive_zone_time integer,
  neutral_zone_time integer,
  dekes integer,
  successful_dekes integer,
  faceoffs_won integer,
  faceoffs_taken integer,
  interceptions integer,
  ppg integer,
  shg integer,
  time_with_puck integer,
  skinterceptions integer DEFAULT 0,
  skfow integer DEFAULT 0,
  skfol integer DEFAULT 0,
  skpenaltiesdrawn integer DEFAULT 0,
  skpasses integer DEFAULT 0,
  skpassattempts integer DEFAULT 0,
  skpossession integer DEFAULT 0,
  glgaa numeric DEFAULT 0.00,
  skppg text,
  glshots text,
  pass_pct numeric,
  season_id integer,
  skshg text,
  glga text,
  glsaves text,
  glsavepct text,
  toiseconds text,
  category text,
  CONSTRAINT ea_player_stats_pkey PRIMARY KEY (id),
  CONSTRAINT ea_player_stats_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id),
  CONSTRAINT ea_player_stats_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

-- EA Team Stats Table
CREATE TABLE public.ea_team_stats (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  match_id uuid NOT NULL,
  ea_match_id text,
  team_id uuid NOT NULL,
  team_name text NOT NULL,
  goals integer NOT NULL DEFAULT 0,
  shots integer NOT NULL DEFAULT 0,
  hits integer NOT NULL DEFAULT 0,
  blocks integer NOT NULL DEFAULT 0,
  pim integer NOT NULL DEFAULT 0,
  pp_goals integer NOT NULL DEFAULT 0,
  pp_opportunities integer NOT NULL DEFAULT 0,
  pp_pct numeric DEFAULT 0,
  faceoff_wins integer NOT NULL DEFAULT 0,
  faceoff_losses integer NOT NULL DEFAULT 0,
  faceoff_pct numeric DEFAULT 0,
  passing_pct numeric DEFAULT 0,
  shot_attempts integer NOT NULL DEFAULT 0,
  shot_pct numeric DEFAULT 0,
  pass_attempts integer NOT NULL DEFAULT 0,
  pass_complete integer NOT NULL DEFAULT 0,
  time_in_offensive_zone integer DEFAULT 0,
  time_in_defensive_zone integer DEFAULT 0,
  time_in_neutral_zone integer DEFAULT 0,
  takeaways integer NOT NULL DEFAULT 0,
  giveaways integer NOT NULL DEFAULT 0,
  season_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ea_team_stats_pkey PRIMARY KEY (id),
  CONSTRAINT ea_team_stats_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id),
  CONSTRAINT ea_team_stats_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

-- ELO Lobbies Table
CREATE TABLE public.elo_lobbies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  status character varying DEFAULT 'waiting'::character varying CHECK (status::text = ANY (ARRAY['waiting'::character varying::text, 'forming_teams'::character varying::text, 'in_progress'::character varying::text, 'completed'::character varying::text, 'cancelled'::character varying::text])),
  max_players integer DEFAULT 12,
  current_players integer DEFAULT 0,
  captain1_id uuid,
  captain2_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  CONSTRAINT elo_lobbies_pkey PRIMARY KEY (id),
  CONSTRAINT elo_lobbies_captain1_id_fkey FOREIGN KEY (captain1_id) REFERENCES public.elo_players(id),
  CONSTRAINT elo_lobbies_captain2_id_fkey FOREIGN KEY (captain2_id) REFERENCES public.elo_players(id)
);

-- ELO Lobby Players Table
CREATE TABLE public.elo_lobby_players (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lobby_id uuid,
  player_id uuid,
  joined_at timestamp with time zone DEFAULT now(),
  position character varying NOT NULL,
  is_captain boolean DEFAULT false,
  team_number integer CHECK (team_number = ANY (ARRAY[1, 2])),
  CONSTRAINT elo_lobby_players_pkey PRIMARY KEY (id),
  CONSTRAINT elo_lobby_players_lobby_id_fkey FOREIGN KEY (lobby_id) REFERENCES public.elo_lobbies(id),
  CONSTRAINT elo_lobby_players_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.elo_players(id)
);

-- ELO Match Players Table
CREATE TABLE public.elo_match_players (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  match_id uuid,
  player_id uuid,
  team_number integer CHECK (team_number = ANY (ARRAY[1, 2])),
  position character varying NOT NULL,
  rating_before integer NOT NULL,
  rating_after integer NOT NULL,
  rating_change integer NOT NULL,
  goals integer DEFAULT 0,
  assists integer DEFAULT 0,
  saves integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  points_lost integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT elo_match_players_pkey PRIMARY KEY (id),
  CONSTRAINT elo_match_players_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.elo_matches(id),
  CONSTRAINT elo_match_players_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.elo_players(id)
);

-- ELO Matches Table
CREATE TABLE public.elo_matches (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  match_date timestamp with time zone DEFAULT now(),
  lobby_id uuid,
  team1_score integer NOT NULL,
  team2_score integer NOT NULL,
  winner_team integer CHECK (winner_team = ANY (ARRAY[1, 2])),
  match_duration integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT elo_matches_pkey PRIMARY KEY (id)
);

-- ELO Players Table
CREATE TABLE public.elo_players (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  discord_id character varying NOT NULL UNIQUE,
  discord_username character varying NOT NULL,
  display_name character varying NOT NULL,
  position character varying NOT NULL,
  elo_rating integer NOT NULL DEFAULT 1200,
  total_matches integer DEFAULT 0,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  draws integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  points_lost integer DEFAULT 0,
  win_streak integer DEFAULT 0,
  loss_streak integer DEFAULT 0,
  highest_rating integer DEFAULT 1200,
  lowest_rating integer DEFAULT 1200,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  last_match_at timestamp with time zone,
  is_active boolean DEFAULT true,
  CONSTRAINT elo_players_pkey PRIMARY KEY (id)
);

-- ELO Settings Table
CREATE TABLE public.elo_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  setting_key character varying NOT NULL UNIQUE,
  setting_value text NOT NULL,
  description text,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT elo_settings_pkey PRIMARY KEY (id)
);

-- Favorite Verses Table
CREATE TABLE public.favorite_verses (
  book_id integer NOT NULL,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT favorite_verses_pkey PRIMARY KEY (verse, book_id, chapter),
  CONSTRAINT favorite_verses_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id)
);

-- File Access Logs Table
CREATE TABLE public.file_access_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  file_path text NOT NULL,
  file_type text NOT NULL,
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  referer text,
  method text DEFAULT 'GET'::text,
  user_id uuid,
  session_id text,
  response_status integer,
  response_time_ms integer,
  timestamp timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT file_access_logs_pkey PRIMARY KEY (id),
  CONSTRAINT file_access_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Forum Categories Table
CREATE TABLE public.forum_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  description text,
  color character varying DEFAULT '#3B82F6'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  admin_only boolean DEFAULT false,
  CONSTRAINT forum_categories_pkey PRIMARY KEY (id)
);

-- Forum Comments Table
CREATE TABLE public.forum_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author_id uuid NOT NULL,
  post_id uuid NOT NULL,
  parent_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT forum_comments_pkey PRIMARY KEY (id),
  CONSTRAINT fk_forum_comments_author FOREIGN KEY (author_id) REFERENCES auth.users(id),
  CONSTRAINT forum_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.forum_comments(id),
  CONSTRAINT forum_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.forum_posts(id)
);

-- Forum Posts Table
CREATE TABLE public.forum_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  content text NOT NULL,
  author_id uuid NOT NULL,
  category_id uuid,
  pinned boolean DEFAULT false,
  locked boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  reply_count integer DEFAULT 0,
  CONSTRAINT forum_posts_pkey PRIMARY KEY (id),
  CONSTRAINT fk_forum_posts_author FOREIGN KEY (author_id) REFERENCES auth.users(id),
  CONSTRAINT forum_posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.forum_categories(id)
);

-- Forum Replies Table
CREATE TABLE public.forum_replies (
  id bigint NOT NULL DEFAULT nextval('forum_replies_id_seq'::regclass),
  thread_id bigint,
  reply_text text,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT forum_replies_pkey PRIMARY KEY (id),
  CONSTRAINT forum_replies_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.forum_threads(id)
);

-- Forum Threads Table
CREATE TABLE public.forum_threads (
  id bigint NOT NULL DEFAULT nextval('forum_threads_id_seq'::regclass),
  title text NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT forum_threads_pkey PRIMARY KEY (id)
);

-- Game Availability Table
CREATE TABLE public.game_availability (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  match_id uuid NOT NULL,
  player_id uuid NOT NULL,
  user_id uuid NOT NULL,
  team_id uuid NOT NULL,
  status text NOT NULL CHECK (status = ANY (ARRAY['available'::text, 'unavailable'::text, 'injury_reserve'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT game_availability_pkey PRIMARY KEY (id),
  CONSTRAINT game_availability_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id),
  CONSTRAINT game_availability_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT game_availability_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT game_availability_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Goalie Stats Table
CREATE TABLE public.goalie_stats (
  id bigint NOT NULL DEFAULT nextval('goalie_stats_id_seq'::regclass),
  match_id bigint,
  player_id bigint,
  saves integer DEFAULT 0,
  goals_allowed integer DEFAULT 0,
  CONSTRAINT goalie_stats_pkey PRIMARY KEY (id)
);

-- Injury Reserves Table
CREATE TABLE public.injury_reserves (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  player_id uuid,
  team_id uuid,
  user_id uuid,
  status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'inactive'::text])),
  week_start_date date,
  week_end_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT injury_reserves_pkey PRIMARY KEY (id),
  CONSTRAINT injury_reserves_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT injury_reserves_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT injury_reserves_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- IP Logs Table
CREATE TABLE public.ip_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  ip_address character varying NOT NULL,
  action character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  user_agent text,
  CONSTRAINT ip_logs_pkey PRIMARY KEY (id),
  CONSTRAINT ip_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Lineups Table
CREATE TABLE public.lineups (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  match_id uuid NOT NULL,
  team_id uuid NOT NULL,
  player_id uuid NOT NULL,
  position character varying NOT NULL,
  line_number integer NOT NULL DEFAULT 1,
  is_starter boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT lineups_pkey PRIMARY KEY (id),
  CONSTRAINT lineups_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id),
  CONSTRAINT lineups_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT lineups_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

-- Matches Table
CREATE TABLE public.matches (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  home_team_id uuid,
  away_team_id uuid,
  home_score integer DEFAULT 0,
  away_score integer DEFAULT 0,
  match_date timestamp with time zone NOT NULL,
  status text DEFAULT 'Scheduled'::text CHECK (status = ANY (ARRAY['Scheduled'::text, 'In Progress'::text, 'Completed'::text, 'Cancelled'::text])),
  ea_match_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  period_scores jsonb DEFAULT '[]'::jsonb,
  has_overtime boolean DEFAULT false,
  has_shootout boolean DEFAULT false,
  stats_synced boolean DEFAULT false,
  season_name text,
  season_id uuid,
  overtime boolean DEFAULT false,
  ea_match_data jsonb,
  is_manual_import boolean DEFAULT false,
  server character varying,
  featured boolean DEFAULT false,
  CONSTRAINT matches_pkey PRIMARY KEY (id),
  CONSTRAINT matches_away_team_id_fkey FOREIGN KEY (away_team_id) REFERENCES public.teams(id),
  CONSTRAINT matches_home_team_id_fkey FOREIGN KEY (home_team_id) REFERENCES public.teams(id)
);

-- News Table
CREATE TABLE public.news (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  excerpt text,
  CONSTRAINT news_pkey PRIMARY KEY (id),
  CONSTRAINT news_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id)
);

-- Notes Table
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  book_id integer,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id)
);

-- Notifications Table
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  link text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  data jsonb,
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Permissions Table
CREATE TABLE public.permissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  description text,
  resource character varying NOT NULL,
  action character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT permissions_pkey PRIMARY KEY (id)
);

-- Photos Table
CREATE TABLE public.photos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL,
  description text,
  category character varying NOT NULL DEFAULT 'general'::character varying,
  file_path character varying NOT NULL,
  url text NOT NULL,
  size integer,
  file_type character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT photos_pkey PRIMARY KEY (id)
);

-- Player Bidding Table
CREATE TABLE public.player_bidding (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  player_id uuid,
  team_id uuid,
  bid_amount integer NOT NULL CHECK (bid_amount > 0),
  bid_expires_at timestamp with time zone NOT NULL,
  status text DEFAULT 'Active'::text CHECK (status = ANY (ARRAY['Active'::text, 'Won'::text, 'Outbid'::text, 'Expired'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  processed boolean DEFAULT false,
  won_bid boolean DEFAULT false,
  processed_at timestamp with time zone,
  cancellation_reason text,
  finalized boolean DEFAULT false,
  user_id uuid,
  CONSTRAINT player_bidding_pkey PRIMARY KEY (id),
  CONSTRAINT player_bidding_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT player_bidding_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT player_bidding_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Player Stats Table
CREATE TABLE public.player_stats (
  id bigint NOT NULL DEFAULT nextval('player_stats_id_seq'::regclass),
  match_id bigint,
  player_id bigint,
  goals integer DEFAULT 0,
  assists integer DEFAULT 0,
  shots integer DEFAULT 0,
  CONSTRAINT player_stats_pkey PRIMARY KEY (id)
);

-- Player Transfers Table
CREATE TABLE public.player_transfers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  player_id uuid NOT NULL,
  from_team_id uuid,
  to_team_id uuid NOT NULL,
  transfer_amount integer NOT NULL,
  transfer_type character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT player_transfers_pkey PRIMARY KEY (id),
  CONSTRAINT player_transfers_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT player_transfers_from_team_id_fkey FOREIGN KEY (from_team_id) REFERENCES public.teams(id),
  CONSTRAINT player_transfers_to_team_id_fkey FOREIGN KEY (to_team_id) REFERENCES public.teams(id)
);

-- Players Table
CREATE TABLE public.players (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE,
  team_id uuid,
  salary integer DEFAULT 0,
  role text DEFAULT 'Player'::text CHECK (role = ANY (ARRAY['Player'::text, 'GM'::text, 'AGM'::text, 'Owner'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  retained_salary bigint DEFAULT 0,
  manually_removed boolean DEFAULT false,
  manually_removed_at timestamp with time zone,
  manually_removed_by uuid,
  status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'free_agent'::text, 'waived'::text, 'retired'::text])),
  CONSTRAINT players_pkey PRIMARY KEY (id),
  CONSTRAINT players_manually_removed_by_fkey FOREIGN KEY (manually_removed_by) REFERENCES auth.users(id),
  CONSTRAINT players_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT players_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Prayers Table
CREATE TABLE public.prayers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  status text DEFAULT 'active'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT prayers_pkey PRIMARY KEY (id)
);

-- Role Permissions Table
CREATE TABLE public.role_permissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  role_id uuid,
  permission_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT role_permissions_pkey PRIMARY KEY (id),
  CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id),
  CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id)
);

-- Roles Table
CREATE TABLE public.roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  display_name character varying NOT NULL,
  description text,
  level integer NOT NULL DEFAULT 0,
  is_system_role boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);

-- Season Registrations Table
CREATE TABLE public.season_registrations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  season_number integer NOT NULL,
  primary_position text NOT NULL,
  secondary_position text,
  gamer_tag text NOT NULL,
  console text NOT NULL CHECK (console = ANY (ARRAY['Xbox'::text, 'PS5'::text])),
  status text DEFAULT 'Pending'::text CHECK (status = ANY (ARRAY['Pending'::text, 'Approved'::text, 'Rejected'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  season_id uuid,
  CONSTRAINT season_registrations_pkey PRIMARY KEY (id),
  CONSTRAINT season_registrations_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id),
  CONSTRAINT season_registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Seasons Table
CREATE TABLE public.seasons (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  season_number integer,
  number integer,
  is_playoffs boolean DEFAULT false,
  playoff_teams uuid[],
  parent_season_id uuid,
  CONSTRAINT seasons_pkey PRIMARY KEY (id),
  CONSTRAINT seasons_parent_season_id_fkey FOREIGN KEY (parent_season_id) REFERENCES public.seasons(id)
);

-- Security Events Table
CREATE TABLE public.security_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  severity text NOT NULL CHECK (severity = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text])),
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  user_id uuid,
  session_id text,
  details jsonb,
  resolved boolean DEFAULT false,
  resolved_at timestamp with time zone,
  resolved_by uuid,
  timestamp timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT security_events_pkey PRIMARY KEY (id),
  CONSTRAINT security_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT security_events_resolved_by_fkey FOREIGN KEY (resolved_by) REFERENCES auth.users(id)
);

-- System Settings Table
CREATE TABLE public.system_settings (
  id integer NOT NULL DEFAULT nextval('system_settings_id_seq'::regclass),
  key character varying NOT NULL UNIQUE,
  value jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT system_settings_pkey PRIMARY KEY (id)
);

-- Team Awards Table
CREATE TABLE public.team_awards (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  team_id uuid NOT NULL,
  award_type character varying NOT NULL,
  season_number integer NOT NULL,
  year integer NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_awards_pkey PRIMARY KEY (id),
  CONSTRAINT team_awards_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

-- Team Chat Messages Table
CREATE TABLE public.team_chat_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL,
  user_id uuid NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_chat_messages_pkey PRIMARY KEY (id),
  CONSTRAINT team_chat_messages_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT team_chat_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Team Managers Table
CREATE TABLE public.team_managers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  team_id uuid NOT NULL,
  role text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_managers_pkey PRIMARY KEY (id),
  CONSTRAINT team_managers_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT team_managers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Teams Table
CREATE TABLE public.teams (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  logo_url text,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  otl integer DEFAULT 0,
  goals_for integer DEFAULT 0,
  goals_against integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  season_id integer DEFAULT 1,
  ea_club_id text,
  is_active boolean NOT NULL DEFAULT true,
  powerplay_goals integer DEFAULT 0,
  powerplay_opportunities integer DEFAULT 0,
  penalty_kill_goals_against integer DEFAULT 0,
  penalty_kill_opportunities integer DEFAULT 0,
  manual_override boolean DEFAULT false,
  points integer DEFAULT 0,
  games_played integer DEFAULT 0,
  total_retained_salary bigint DEFAULT 0,
  discord_role_id text,
  conference_id uuid,
  CONSTRAINT teams_pkey PRIMARY KEY (id),
  CONSTRAINT teams_conference_id_fkey FOREIGN KEY (conference_id) REFERENCES public.conferences(id)
);

-- Token Redeemables Table
CREATE TABLE public.token_redeemables (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cost integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT token_redeemables_pkey PRIMARY KEY (id)
);

-- Token Redemptions Table
CREATE TABLE public.token_redemptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  redeemable_id uuid,
  tokens_spent integer NOT NULL,
  status character varying DEFAULT 'pending'::character varying,
  notes text,
  admin_user_id uuid,
  season_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT token_redemptions_pkey PRIMARY KEY (id),
  CONSTRAINT token_redemptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT token_redemptions_admin_user_id_fkey FOREIGN KEY (admin_user_id) REFERENCES public.users(id),
  CONSTRAINT token_redemptions_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id)
);

-- Token Transactions Table
CREATE TABLE public.token_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL,
  transaction_type character varying NOT NULL,
  source character varying NOT NULL,
  description text,
  reference_id uuid,
  admin_user_id uuid,
  season_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT token_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT token_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT token_transactions_admin_user_id_fkey FOREIGN KEY (admin_user_id) REFERENCES public.users(id),
  CONSTRAINT token_transactions_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id)
);

-- Tokens Table
CREATE TABLE public.tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  balance integer NOT NULL DEFAULT 0,
  season_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tokens_pkey PRIMARY KEY (id),
  CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT tokens_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id)
);

-- Trades Table
CREATE TABLE public.trades (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  team1_id uuid NOT NULL,
  team2_id uuid NOT NULL,
  team1_players jsonb,
  team2_players jsonb,
  trade_message text,
  created_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'accepted'::text, 'rejected'::text, 'completed'::text, 'cancelled'::text])),
  trade_date timestamp without time zone DEFAULT now(),
  team1_response text DEFAULT 'pending'::text,
  team2_response text DEFAULT 'pending'::text,
  team1_response_at timestamp with time zone,
  team2_response_at timestamp with time zone,
  completed_at timestamp with time zone,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT trades_pkey PRIMARY KEY (id),
  CONSTRAINT fk_team1 FOREIGN KEY (team1_id) REFERENCES public.teams(id),
  CONSTRAINT fk_team2 FOREIGN KEY (team2_id) REFERENCES public.teams(id),
  CONSTRAINT trades_team1_id_fkey FOREIGN KEY (team1_id) REFERENCES public.teams(id),
  CONSTRAINT trades_team2_id_fkey FOREIGN KEY (team2_id) REFERENCES public.teams(id)
);

-- User Roles Table
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  role text NOT NULL CHECK (role = ANY (ARRAY['Player'::text, 'GM'::text, 'AGM'::text, 'Owner'::text, 'Admin'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  role_id uuid,
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Users Table
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  gamer_tag_id text NOT NULL UNIQUE,
  discord_name text,
  primary_position text NOT NULL,
  secondary_position text,
  console text NOT NULL CHECK (console = ANY (ARRAY['Xbox'::text, 'PS5'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  registration_ip character varying,
  last_login_ip character varying,
  last_login_at timestamp with time zone,
  username character varying,
  gamer_tag text,
  twitch_username character varying,
  twitch_user_id character varying,
  twitch_access_token text,
  twitch_refresh_token text,
  twitch_connected_at timestamp with time zone,
  is_streaming boolean DEFAULT false,
  stream_title text,
  stream_game_name character varying,
  stream_viewer_count integer DEFAULT 0,
  stream_started_at timestamp with time zone,
  twitch_id text,
  twitch_login text,
  twitch_display_name text,
  twitch_profile_image_url text,
  twitch_connected boolean DEFAULT false,
  avatar_url text,
  email_notifications boolean DEFAULT true,
  game_notifications boolean DEFAULT true,
  news_notifications boolean DEFAULT true,
  ban_reason text,
  ban_expiration timestamp with time zone,
  is_banned boolean NOT NULL DEFAULT false,
  discord_id text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Verification Tokens Table
CREATE TABLE public.verification_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  token text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL,
  used_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT verification_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT verification_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Waiver Claims Table
CREATE TABLE public.waiver_claims (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  waiver_id uuid NOT NULL,
  claiming_team_id uuid NOT NULL,
  priority_at_claim integer,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  claimed_at timestamp with time zone DEFAULT now(),
  CONSTRAINT waiver_claims_pkey PRIMARY KEY (id),
  CONSTRAINT waiver_claims_waiver_id_fkey FOREIGN KEY (waiver_id) REFERENCES public.waivers(id),
  CONSTRAINT waiver_claims_claiming_team_id_fkey FOREIGN KEY (claiming_team_id) REFERENCES public.teams(id)
);

-- Waiver Priority Table
CREATE TABLE public.waiver_priority (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL UNIQUE,
  priority integer NOT NULL,
  last_used timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT waiver_priority_pkey PRIMARY KEY (id),
  CONSTRAINT waiver_priority_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);

-- Waivers Table
CREATE TABLE public.waivers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL,
  waiving_team_id uuid NOT NULL,
  waived_at timestamp with time zone DEFAULT now(),
  claim_deadline timestamp with time zone NOT NULL,
  status character varying DEFAULT 'active'::character varying CHECK (status::text = ANY (ARRAY['active'::character varying::text, 'claimed'::character varying::text, 'cleared'::character varying::text, 'cancelled'::character varying::text])),
  winning_team_id uuid,
  processed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT waivers_pkey PRIMARY KEY (id),
  CONSTRAINT waivers_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT waivers_waiving_team_id_fkey FOREIGN KEY (waiving_team_id) REFERENCES public.teams(id),
  CONSTRAINT waivers_winning_team_id_fkey FOREIGN KEY (winning_team_id) REFERENCES public.teams(id)
);

-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create feature_status enum
CREATE TYPE public.feature_status AS ENUM ('draft', 'experimental', 'stable', 'deprecated', 'removed');

-- Create feature_category enum
CREATE TYPE public.feature_category AS ENUM (
  'theme_appearance',
  'layout_navigation', 
  'interactions',
  'responsive',
  'state_persistence',
  'accessibility',
  'content',
  'system',
  'meta'
);

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Features table - master list of all platform features
CREATE TABLE public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category feature_category NOT NULL,
  status feature_status NOT NULL DEFAULT 'draft',
  icon_name TEXT DEFAULT 'Sparkles',
  default_config JSONB DEFAULT '{}'::jsonb,
  dependencies TEXT[] DEFAULT '{}',
  performance_impact TEXT DEFAULT 'low',
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feature versions for version control
CREATE TABLE public.feature_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id UUID REFERENCES public.features(id) ON DELETE CASCADE NOT NULL,
  version TEXT NOT NULL,
  changelog TEXT,
  config_schema JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (feature_id, version)
);

-- User feature configurations (enabled features + settings)
CREATE TABLE public.user_feature_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature_id UUID REFERENCES public.features(id) ON DELETE CASCADE NOT NULL,
  enabled BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, feature_id)
);

-- User workspaces (saved workspace profiles)
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  ui_state JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Saved playground states
CREATE TABLE public.playground_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature_id UUID REFERENCES public.features(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feature usage analytics
CREATE TABLE public.feature_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id UUID REFERENCES public.features(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- System settings
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feature_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playground_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON public.features FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_feature_configs_updated_at BEFORE UPDATE ON public.user_feature_configs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_playground_states_updated_at BEFORE UPDATE ON public.playground_states FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles: Only admins can manage, users can view own
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Features: Everyone can read, only admins can modify
CREATE POLICY "Features are viewable by everyone" ON public.features FOR SELECT USING (true);
CREATE POLICY "Admins can manage features" ON public.features FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Feature versions: Everyone can read
CREATE POLICY "Feature versions are viewable by everyone" ON public.feature_versions FOR SELECT USING (true);
CREATE POLICY "Admins can manage feature versions" ON public.feature_versions FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- User feature configs: Users manage their own
CREATE POLICY "Users can view own feature configs" ON public.user_feature_configs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feature configs" ON public.user_feature_configs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own feature configs" ON public.user_feature_configs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own feature configs" ON public.user_feature_configs FOR DELETE USING (auth.uid() = user_id);

-- Workspaces: Users manage their own
CREATE POLICY "Users can view own workspaces" ON public.workspaces FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workspaces" ON public.workspaces FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workspaces" ON public.workspaces FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workspaces" ON public.workspaces FOR DELETE USING (auth.uid() = user_id);

-- Playground states: Users manage their own
CREATE POLICY "Users can view own playground states" ON public.playground_states FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own playground states" ON public.playground_states FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own playground states" ON public.playground_states FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own playground states" ON public.playground_states FOR DELETE USING (auth.uid() = user_id);

-- Feature analytics: Users can insert, admins can view all
CREATE POLICY "Users can insert analytics" ON public.feature_analytics FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Admins can view all analytics" ON public.feature_analytics FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- System settings: Everyone can read, admins can modify
CREATE POLICY "System settings are viewable by everyone" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage system settings" ON public.system_settings FOR ALL USING (public.has_role(auth.uid(), 'admin'));
import React, { ReactNode } from "react";

type DateTime = string;

export type Nullable<T> = T | null;

export interface DashboardProps {
  countGame?: number;
  countTeam?: number;
  countUser?: number;
}

export interface Results{
  infrastructure?: string;
  inst_nom: string;
  inst_adresse: string;
  inst_com_nom: string;
  inst_cp: string;
  equip_type_name: string;
  equip_sol: string;
  equip_nature: string;
  equip_numero: string;
}

export interface Team {
  id: number;
  name: string;
  personal_team: boolean;
  created_at: DateTime;
  updated_at: DateTime;
  users: User[];
  owner: User;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  current_team_id: Nullable<number>;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
  account_type: string;
}

export interface Auth {
  user: Nullable<
    User & {
      all_teams?: Team[];
      current_team?: Team;
    }
  >;
  notifications?: Notification[];
}

export interface Notification {
  pivot: { read_at: string | null };
  id: number;
  content: string;
  created_at: string;
  link: string;
}

export type InertiaSharedProps<T = {}> = T & {
  jetstream: {
    canCreateTeams: boolean;
    canManageTwoFactorAuthentication: boolean;
    canUpdatePassword: boolean;
    canUpdateProfileInformation: boolean;
    flash: any;
    hasAccountDeletionFeatures: boolean;
    hasApiFeatures: boolean;
    hasTeamFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
    hasEmailVerification: boolean;
  };
  auth: Auth;
  errorBags: any;
  errors: any;
};

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Sport {

  id: number,
  name: string,
  user_id: number;
}

export interface ShowSportsProps {
  sports: Sport[];
}

export interface Game {
  id: number;
  date: Date;
  start_time: DateTime;
  end_time: DateTime;
  max_player: number;
  sport_id: number;
  teams: Team[];
  equipment_id: string;
  user_id: number;
}

export interface CreateGameProps {
  sports: Sport[];
  playgrounds: Playground[];
  teams: Team[];
}

export interface UpdateGameProps extends CreateGameProps {
  game: Game;
}

export interface ShowGamesProps  {
  games: Game[];
  teams: Team[];
  playgrounds: Playground[];
  sports: Sport[];
}

export interface ShowGameListProps {
  game: Game;
  teams: Team[];
  playground: Playground[];
  sport: Sport[];
}

export interface JoinGameProps {
  game: Game;
  teams: Team[];
}

export interface DefinitionListItemProps {
  term: string;
  description: string;
}

export interface DefinitionListProps {
  children: React.ReactNode
}


export interface Conversation {
  users: any;
  id: number;
  sender_id: number;
  receiver_id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  sender: User;
  receiver: User;
  messages: Message[];
}

export interface Message {
  id: number;
  content: string;
  conversation_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: User;
}

export interface Playground {
  playground_type: string;
  id: number;
  name: string;
  surface_type: string;
  is_covered: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  city: string;
  address: string;
  postcode: string;
  coordgpsx: number;
  coordgpsy: number;
  equipment_id: string;
  installation_id: string;
}

export interface TableProps {
  children: React.ReactNode;
  className?: string
};

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export default Method;

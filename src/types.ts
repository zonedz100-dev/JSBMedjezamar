export type Wilaya = 'قالمة' | 'عنابة' | 'الطارف' | 'تبسة' | 'سوق أهراس';

export interface Club {
  id: string;
  nameAr: string;
  nameFr: string;
  shortName: string;
  acronym: string;
  wilaya: Wilaya;
  city: string;
  foundedYear: number;
  stadium: string;
  stadiumCapacity?: string;
  primaryColor: string;
  secondaryColor: string;
  textColor?: string;
  logoUrl?: string;
  officialUrl?: string;
  facebookUrl?: string;
  description: string;
  badgeStyle: 'circle' | 'shield' | 'oval';
  badgeSymbol: 'lion' | 'stripes' | 'eagle' | 'star' | 'gazelle' | 'crescent' | 'flame' | 'tower' | 'tiger' | 'ball' | 'lighthouse' | 'olympic';
}

export interface MatchFixture {
  id: string;
  round: number;
  roundName: string;
  homeClubId: string;
  awayClubId: string;
  dateStr: string; // e.g., "السبت 19 سبتمبر 2026"
  timestamp: string; // ISO date string e.g. "2026-09-19T15:00:00"
  timeStr: string; // e.g. "15:00 زوالاً"
  stadium: string;
  city: string;
  isFeatured?: boolean;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  referee?: string;
  notes?: string;
}

export interface LeagueStanding {
  rank: number;
  clubId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  category: 'مباريات' | 'أخبار النادي' | 'تدريبات' | 'الرابطة الجهوية' | 'طاقم فني' | 'قوانين ولوائح';
  image: string;
  summary: string;
  content: string;
  author?: string;
  views?: number;
  fileUrl?: string;
  officialUrl?: string;
  isOfficialDocument?: boolean;
}

export interface Player {
  number: number;
  name: string;
  position: 'حارس مرمى' | 'مدافع' | 'وسط ميدان' | 'مهاجم';
  isKey?: boolean;
  role?: string;
}

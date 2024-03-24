export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: Rating;
  image: Image;
  summary: string;
  _links: Links;
}

export interface Rating {
  average: number;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Links {
  self: Self;
  show: Show;
}

export interface Self {
  href: string;
}

export interface Show {
  href: string;
}

export interface ParsedEpisodes {
  name: string;
  episodes: Episode[];
}

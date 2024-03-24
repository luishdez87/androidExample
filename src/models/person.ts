export interface Person {
  id: number;
  url: string;
  name: string;
  country: any;
  birthday: any;
  deathday: any;
  gender: any;
  image: Image;
  updated: number;
  _links: Links;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

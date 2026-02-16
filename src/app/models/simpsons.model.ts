export interface SimpsonsCharacter {
  id: number;
  name: string;
  age: number | null;
  gender: string | null;
  birthdate: string | null;
  occupation: string | null;
  status: string | null;
  portrait_path: string | null;
  phrases: string[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[]; //Esto es una estructura genérica que puede contener cualquier tipo
}

export interface SimpsonsEpisode {
  id: number;
  name: string;
  season: number;
  episode_number: number;
  airdate: string | null;
  image_path: string | null;
  synopsis: string | null;
}

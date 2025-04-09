
export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre: string[];
  releaseDate: string;
  rating: number;
  popularity: number;
  boxOffice: number;
  sentimentScore: number;
}

export interface GenreData {
  name: string;
  value: number;
  color: string;
}

export interface SentimentData {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface TrendData {
  name: string;
  value: number;
}

export interface BoxOfficeData {
  name: string;
  domestic: number;
  international: number;
}


import { Movie, GenreData, SentimentData, TrendData, BoxOfficeData } from "../types/movie";

export const trendingMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    genre: ["Sci-Fi", "Adventure"],
    releaseDate: "2024-03-01",
    rating: 8.7,
    popularity: 98,
    boxOffice: 682500000,
    sentimentScore: 85
  },
  {
    id: 2,
    title: "Godzilla x Kong: The New Empire",
    posterUrl: "https://image.tmdb.org/t/p/w500/tMJsSMzlUJQmDUOmgcvQVy5EKWY.jpg",
    genre: ["Action", "Sci-Fi"],
    releaseDate: "2024-03-29",
    rating: 7.4,
    popularity: 96,
    boxOffice: 485000000,
    sentimentScore: 75
  },
  {
    id: 3,
    title: "Kung Fu Panda 4",
    posterUrl: "https://image.tmdb.org/t/p/w500/v2TpUDGtSZgpjlMbQcuPIFBNGiX.jpg",
    genre: ["Animation", "Comedy"],
    releaseDate: "2024-03-08",
    rating: 7.3,
    popularity: 92,
    boxOffice: 388000000,
    sentimentScore: 88
  },
  {
    id: 4,
    title: "The Fall Guy",
    posterUrl: "https://image.tmdb.org/t/p/w500/n0UwXZY1yQn2iSQMG0yREz7dzdG.jpg",
    genre: ["Action", "Comedy"],
    releaseDate: "2024-05-03",
    rating: 7.5,
    popularity: 93,
    boxOffice: 165000000,
    sentimentScore: 81
  },
  {
    id: 5,
    title: "Civil War",
    posterUrl: "https://image.tmdb.org/t/p/w500/n0n8uMVUwqr34FNXBC1OUoyLY37.jpg",
    genre: ["Action", "Drama"],
    releaseDate: "2024-04-12",
    rating: 7.1,
    popularity: 85,
    boxOffice: 140000000,
    sentimentScore: 65
  },
  {
    id: 6,
    title: "Kingdom of the Planet of the Apes",
    posterUrl: "https://image.tmdb.org/t/p/w500/1lG9ezVCk4dXaiLLmEfRadET4hs.jpg",
    genre: ["Sci-Fi", "Action"],
    releaseDate: "2024-05-10",
    rating: 7.8,
    popularity: 89,
    boxOffice: 180000000,
    sentimentScore: 78
  }
];

export const genreData: GenreData[] = [
  { name: "Action", value: 45, color: "#3B82F6" },
  { name: "Sci-Fi", value: 30, color: "#8B5CF6" },
  { name: "Comedy", value: 25, color: "#10B981" },
  { name: "Drama", value: 20, color: "#F59E0B" },
  { name: "Animation", value: 15, color: "#EC4899" }
];

export const sentimentData: SentimentData[] = [
  { name: "Dune: Part Two", positive: 85, neutral: 10, negative: 5 },
  { name: "Godzilla x Kong", positive: 75, neutral: 15, negative: 10 },
  { name: "Kung Fu Panda 4", positive: 88, neutral: 9, negative: 3 },
  { name: "The Fall Guy", positive: 81, neutral: 12, negative: 7 },
  { name: "Civil War", positive: 65, neutral: 20, negative: 15 }
];

export const weeklyTrendData: TrendData[] = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 75 },
  { name: "Wed", value: 68 },
  { name: "Thu", value: 82 },
  { name: "Fri", value: 95 },
  { name: "Sat", value: 98 },
  { name: "Sun", value: 85 }
];

export const boxOfficeData: BoxOfficeData[] = [
  { name: "Week 1", domestic: 120, international: 180 },
  { name: "Week 2", domestic: 80, international: 150 },
  { name: "Week 3", domestic: 60, international: 120 },
  { name: "Week 4", domestic: 40, international: 90 },
  { name: "Week 5", domestic: 30, international: 70 },
  { name: "Week 6", domestic: 20, international: 50 }
];

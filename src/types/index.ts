// Types pour les articles RSS et les briefs
export interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet?: string;
}

export interface Brief {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  summary: string;
}

// Types pour les configurations
export interface FeedConfig {
  url: string;
  category: string;
  description?: string;
}

// Types pour les API responses
export interface BriefResponse {
  briefs: Brief[];
}

export interface SummaryOptions {
  maxLength?: number;
  language?: string;
}

// Types pour les scripts de podcast
export interface PodcastScript {
  pubDate: string;
  summary: string;
  savedAt?: string;
}

// Types pour les erreurs API
export interface ApiError {
  error: string;
  status?: number;
}

import Parser from "rss-parser";
import { Article } from "@/types";
import { RSS_FEEDS, DEFAULT_ARTICLE_LIMIT } from "@/config/feeds";

const parser = new Parser();

export async function fetchArticles(): Promise<Article[]> {
  const allArticles: Article[] = [];

  // --- 1. Récupération via RSS ---
  for (const feedConfig of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedConfig.url);

      const articles: Article[] = feed.items.map((item) => ({
        title: item.title ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate ?? new Date().toISOString(),
        source: feed.title ?? feedConfig.category,
        contentSnippet: item.contentSnippet ?? "",
      }));

      allArticles.push(...articles);
    } catch (error) {
      console.error(
        `Erreur lors de la lecture du flux ${feedConfig.url} (${feedConfig.category}) :`,
        error
      );
    }
  }

  // --- 3. Tri des articles (plus récents en premier) ---
  allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return allArticles.slice(0, DEFAULT_ARTICLE_LIMIT);
}

import { NextResponse } from "next/server";
import { getTodayArticles } from "@/lib/getBrief";
import { fetchArticles } from "@/lib/fetchFeeds";
import { summarize } from "@/lib/summarize";
import { saveBrief } from "@/lib/saveBrief";
import { selectArticles } from "@/lib/select-articles";
import { Brief } from "@/types";

export async function GET() {
  // 1. Vérifier si des briefs existent déjà pour aujourd'hui
  const todayBriefs = await getTodayArticles();
  if (todayBriefs.length > 0) {
    return NextResponse.json({ briefs: todayBriefs });
  }

  // 2. Sinon, générer les briefs à partir des articles
  const articles = await fetchArticles();
  console.log(articles);
  const indexes = await selectArticles(
    articles.map((article) => article.title!)
  );
  console.log(indexes);

  // Traiter chaque article sélectionné
  const briefs: Brief[] = await Promise.all(
    indexes.map(async (index: number) => {
      const article = articles[index];
      const summary = await summarize(article.contentSnippet || "");

      return {
        title: article.title || "",
        link: article.link || "",
        pubDate: article.pubDate || "",
        source: article.source || "",
        summary: summary || "",
      };
    })
  );

  // 3. Stocker les briefs
  await Promise.all(briefs.map((brief) => saveBrief(brief)));

  return NextResponse.json({ briefs });
}

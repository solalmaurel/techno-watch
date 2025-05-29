// scripts/test-fetch.ts
import dotenv from "dotenv";
dotenv.config();

import { fetchArticles } from "../lib/fetchFeeds";

async function main() {
  const articles = await fetchArticles();
  console.log("📰 Articles récupérés :", articles.length);
  articles.forEach((a, i) => {
    console.log(`\n[${i + 1}] ${a.title}`);
    console.log(`   🔗 ${a.link}`);
    console.log(`   🗓️  ${a.pubDate}`);
    console.log(`   🏷️  Source: ${a.source}`);
    if (a.contentSnippet) {
      console.log(`   📝 ${a.contentSnippet.slice(0, 150)}...`);
    }
  });
}

main().catch(console.error);

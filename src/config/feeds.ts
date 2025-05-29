import { FeedConfig } from "@/types";

export const RSS_FEEDS: FeedConfig[] = [
  // 🧠 Intelligence Artificielle
  {
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    category: "AI",
    description: "Actu IA sur The Verge",
  },
  {
    url: "https://venturebeat.com/category/ai/feed/",
    category: "AI",
    description: "Actu IA sur VentureBeat",
  },

  // 💻 Tech générale & Développement
  {
    url: "https://techcrunch.com/feed/",
    category: "Tech",
    description: "News tech et startups (TechCrunch)",
  },
  {
    url: "https://www.smashingmagazine.com/feed/",
    category: "Development",
    description: "Articles frontend, UX, dev web",
  },
  {
    url: "https://stackoverflow.blog/feed/",
    category: "Development",
    description: "Articles et insights sur le développement logiciel",
  },

  // ☁️ Cloud, DevOps, Infrastructure
  {
    url: "https://aws.amazon.com/blogs/aws/feed/",
    category: "Cloud",
    description: "Nouveautés AWS",
  },
  {
    url: "https://azure.microsoft.com/en-us/blog/feed/",
    category: "Cloud",
    description: "Nouveautés Microsoft Azure",
  },
  {
    url: "https://kubernetes.io/feed.xml",
    category: "DevOps",
    description: "Blog officiel Kubernetes",
  },

  // 📱 Mobile & Frameworks
  {
    url: "https://reactjs.org/feed.xml",
    category: "Frontend",
    description: "Blog officiel de React",
  },
  {
    url: "https://android-developers.googleblog.com/feeds/posts/default",
    category: "Mobile",
    description: "Blog Android Dev officiel",
  },
  {
    url: "https://developer.apple.com/news/rss/news.rss",
    category: "Mobile",
    description: "News pour devs Apple/iOS",
  },
];

export const BRAVE_SEARCH_QUERIES = ["AI news", "tech news"];

export const DEFAULT_ARTICLE_LIMIT = 30;

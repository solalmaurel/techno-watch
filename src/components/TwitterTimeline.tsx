"use client";

import { useEffect } from "react";

type Props = {
  username: string; // ex: "elonmusk"
  theme?: "light" | "dark";
  height?: number;
};

declare global {
  interface Window {
    twttr?: unknown;
  }
}

export default function TwitterTimeline({
  username,
  theme = "dark",
  height = 600,
}: Props) {
  useEffect(() => {
    // Charge le script Twitter une seule fois
    if (window && !window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section>
      <a
        className="twitter-timeline"
        data-theme={theme}
        data-height={height}
        href={`https://twitter.com/${username}`}
      >
        Tweets by @{username}
      </a>
    </section>
  );
}

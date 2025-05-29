"use client";

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { Newspaper, Mic } from "lucide-react";

type Brief = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  summary: string;
};

export default function BriefDuJour() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [podcastScript, setPodcastScript] = useState<string>("");
  const [generatingScript, setGeneratingScript] = useState(false);

  useEffect(() => {
    fetch("/api/brief")
      .then((res) => res.json())
      .then((data) => {
        setBriefs(data.briefs || []);
        setLoading(false);
      });
  }, []);

  const generatePodcastScript = async () => {
    setGeneratingScript(true);
    try {
      const response = await fetch("/api/podcast-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefs }),
      });
      const data = await response.json();
      setPodcastScript(data.script);
    } catch (error) {
      console.error("Erreur lors de la génération du script:", error);
    } finally {
      setGeneratingScript(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-10">
        <p className="text-center text-zinc-400">Chargement des briefs...</p>
      </div>
    );
  }

  if (!briefs || briefs.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-10">
        <p className="text-center text-zinc-400">Aucun brief disponible.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Brief Tech du Jour</h1>
            </div>
            <p className="text-base text-zinc-400">
              {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
        {briefs.map((brief, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 shadow hover:shadow-lg transition-all"
          >
            <a href={brief.link} target="_blank" rel="noopener noreferrer">
              <h2 className="text-xl font-semibold text-purple-300 hover:underline">
                {brief.title}
              </h2>
            </a>
            <p className="text-sm text-zinc-400 mt-1">
              {new Date(brief.pubDate).toLocaleDateString("fr-FR")} ·{" "}
              {brief.source}
            </p>
            <div className="mt-4 text-zinc-200 prose prose-invert prose-sm max-w-none font-mono">
              <ReactMarkdown>{brief.summary}</ReactMarkdown>
            </div>
          </div>
        ))}

        {/* Bouton pour générer le script de podcast */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={generatePodcastScript}
            disabled={generatingScript}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Mic className="w-5 h-5" />
            {generatingScript
              ? "Génération du script..."
              : "Générer le script podcast"}
          </button>
        </div>

        {/* Affichage du script de podcast */}
        {podcastScript && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
              <Mic className="w-6 h-6" />
              Script Podcast
            </h3>
            <div className="text-zinc-200 prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{podcastScript}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

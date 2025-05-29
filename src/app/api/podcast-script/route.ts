import { NextRequest, NextResponse } from "next/server";
import { getTodayScript, getTodayArticles } from "@/lib/getBrief";
import { writePodcast } from "@/lib/write-podcast";
import { saveScript } from "@/lib/saveScript";
import { Brief } from "@/types";

export async function GET() {
  // 1. Vérifier si un script existe déjà pour aujourd'hui
  const todayScript = await getTodayScript();
  if (todayScript) {
    return NextResponse.json({ script: todayScript.summary });
  }

  // 2. Sinon, récupérer les briefs du jour
  const todayBriefs = await getTodayArticles();
  if (todayBriefs.length === 0) {
    return NextResponse.json(
      { error: "Aucun brief disponible pour générer le script" },
      { status: 404 }
    );
  }

  // 3. Générer le script à partir des briefs
  const summaries = todayBriefs.map((brief) => brief.summary);
  console.log("Génération du script...");
  const scriptContent = await writePodcast(summaries);

  // 4. Stocker le script
  const script = {
    pubDate: new Date().toISOString(),
    summary: scriptContent || "",
  };
  await saveScript(script);

  return NextResponse.json({ script: scriptContent });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Vérifier si un script existe déjà pour aujourd'hui
    const todayScript = await getTodayScript();
    if (todayScript) {
      return NextResponse.json({ script: todayScript.summary });
    }

    // 2. Utiliser les briefs fournis dans la requête
    const { briefs } = await request.json();
    if (!briefs || briefs.length === 0) {
      return NextResponse.json(
        { error: "Aucun brief fourni" },
        { status: 400 }
      );
    }

    // 3. Générer le script
    const summaries = briefs.map((brief: Brief) => brief.summary);
    const scriptContent = await writePodcast(summaries);

    // 4. Stocker le script
    const script = {
      pubDate: new Date().toISOString(),
      summary: scriptContent || "",
    };
    await saveScript(script);

    return NextResponse.json({ script: scriptContent });
  } catch (error) {
    console.error("Erreur lors de la génération du script:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du script" },
      { status: 500 }
    );
  }
}

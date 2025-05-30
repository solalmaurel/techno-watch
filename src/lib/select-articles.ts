import OpenAI from "openai";
import { DEFAULT_ARTICLE_LIMIT } from "@/config/feeds";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function selectArticles(titles: string[]) {
  const prompt = `
    Tu es un assistant de vulgarisation technique.
    Tu dois sélectionner les 10 articles les plus pertinents pour des amateurs de technologie et d'IA parmi les titres suivants :
    ${titles.map((title, index) => `${index}. ${title}`).join("\n")}
    
    IMPORTANT: Tu dois répondre UNIQUEMENT avec 10 nombres séparés par des virgules, représentant les indices des articles.
    Format de réponse attendu: X,Y,Z où X, Y et Z sont des nombres entre 0 et ${
      titles.length - 1
    }
    Exemple de réponse valide: 0,2,3,6,12,45,32,12,4,56 (sans guillemets)
    `;

  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini", // ou 'gpt-3.5-turbo'
    messages: [
      {
        role: "system",
        content:
          "Tu es un assistant spécialisé en vulgarisation technologique.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const response = chat.choices[0]?.message?.content ?? "";
  console.log(response);
  // Vérifier que la réponse est bien au format attendu
  const indexes = response.trim().split(",").map(Number);
  console.log(indexes);
  if (
    indexes.length !== DEFAULT_ARTICLE_LIMIT ||
    indexes.some(isNaN) ||
    indexes.some((i: number) => i >= titles.length)
  ) {
    throw new Error("Format de réponse invalide de l'IA");
  }

  return indexes;
}

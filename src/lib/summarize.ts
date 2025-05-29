// lib/summarize.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarize(text: string) {
  const prompt = `
Tu es un assistant qui rédige des résumés techniques concis et accessibles à un public non expert.

Voici un extrait d'article :
"${text}"

Donne un résumé clair, en **3 bullet points maximum**, vulgarisé et utile.

- Utilise le format **Markdown** pour mettre certains mots en gras ou en italique si pertinent.
- Si tu expliques un terme technique, mets-le en gras pour qu'on le remarque facilement.
- Ne fais pas de titre, juste la liste à puce.
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

  return chat.choices[0]?.message?.content ?? "";
}

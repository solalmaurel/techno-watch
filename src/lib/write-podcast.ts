import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function writePodcast(summaries: string[]) {
  const prompt = `
Tu es un rédacteur de podcast tech.

À partir des résumés suivants, écris un script naturel, fluide et engageant pour un podcast de 3 à 5 minutes.

- Le ton doit être chaleureux, clair, et pédagogique (ni robotique, ni trop familier).
- Présente chaque actu avec une phrase d’intro courte.
- Explique les termes techniques si nécessaire, mais reste concis.
- Termine par une phrase de clôture ou d’ouverture vers demain.
- Ajoute des respirations ou pauses implicites (“…”, “Eh bien”, “Intéressant, non ?”).

Voici les résumés à convertir :
${summaries}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "Tu es un rédacteur de podcast tech, spécialisé dans la vulgarisation et l’info claire.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
  });

  return response.choices[0].message.content;
}

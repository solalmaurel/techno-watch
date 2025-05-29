// lib/summarize-local.ts
export async function summarize(text: string) {
  const prompt = `
  Tu es un assistant de vulgarisation technique.
  
  Voici un extrait d'article :
  "${text}"
  
  Fais un résumé clair et accessible, en 3 bullet points maximum.
  Simplifie si besoin.
  `;

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi3", // ou llama3, phi3, etc.
      prompt: prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.response;
}

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const PROMPTS = {
  'do-text': `Respond with executable steps only. Be elegantly compressed—use **bold** for key actions and • bullets for sub-steps. No explanations, no context, no "why"—just what to do, in order. Maximum 4 main steps. If the prompt is vague, conversational, or doesn't lend itself to actionable steps (e.g. "hello", "thanks", "what's up"), include a friendly note like: "**Happy to help!** Try asking a specific question or giving me a task—Extended Learning works best when there's something concrete to explore at different depths."`,
  
  'do-visual': `Create an ASCII diagram showing the sequence/timeline/flowchart.
Use box-drawing characters: ┌ ─ ┐ │ └ ┘ ▶ ▼ ───▶
Show steps as connected boxes. Labels inside boxes. Keep it clean.`,

  'get-text': `Respond with analogies connecting to familiar concepts. Be elegantly compressed—use **bold** for key insights and • bullets for comparisons. Help them understand WHY by relating to something they already know. Use metaphors, comparisons, and mental models. Keep it concise but vivid. If the prompt is vague or conversational, still provide a helpful analogy-based response that guides them toward asking better questions.`,
  
  'get-visual': `Create an ASCII diagram mapping this concept to a familiar analogy.
Two columns: left = this concept, right = familiar equivalent.
Use ═══════ to connect parallel ideas. Show the structural similarity.`,

  'know-text': `Respond with the underlying principle—the abstract pattern that applies across domains. Be elegantly compressed—use **bold** for the core principle and • bullets for applications. Strip away specifics and reveal universal truth. Keep it concise but profound. If the prompt is vague, still identify and share a relevant universal principle that could apply to their situation.`,
  
  'know-visual': `Create an ASCII diagram showing the abstract pattern.
Minimal, conceptual. Show the universal loop/structure/relationship.
List 3-4 domains where this pattern appears.`,
};

async function fetchLevel(text, responseKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: PROMPTS[responseKey],
      messages: [{ role: 'user', content: text }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, errorText);
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  return data.content[0].text;
}

export function fetchAllLevels(text, onLevelLoaded) {
  const responseKeys = ['do-text', 'do-visual', 'get-text', 'get-visual', 'know-text', 'know-visual'];
  
  // Fire all 6 requests simultaneously
  responseKeys.forEach(async (responseKey) => {
    try {
      const result = await fetchLevel(text, responseKey);
      onLevelLoaded(responseKey, result);
    } catch (e) {
      onLevelLoaded(responseKey, `Error: ${e.message}`);
    }
  });
}
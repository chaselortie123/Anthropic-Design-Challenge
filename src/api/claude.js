const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const PROMPTS = {
  do: `Give clear, numbered steps the user can execute immediately. No explanations, no context, no "why"—just what to do, in order. Be concise. If the request is too vague to give steps, ask one clarifying question.`,

  get: `Help the user build a felt sense of this topic by connecting it to something they already understand. Use analogies, metaphors, and comparisons. The goal isn't to explain the logic—it's to make the right answer *feel* obvious. After reading this, they should be able to guess correctly in new situations, even if they can't articulate why.`,

  know: `Identify the underlying principle—the abstract pattern that makes this work and applies across domains. Strip away the specifics of the question and reveal what's universally true. Be concise. The reader should finish thinking "where else does this apply?" not "how do I do this?"`,
};

async function fetchLevel(text, level) {
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
      system: PROMPTS[level],
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
  ['do', 'get', 'know'].forEach(async (level) => {
    try {
      const content = await fetchLevel(text, level);
      onLevelLoaded(level, content);
    } catch (e) {
      onLevelLoaded(level, `Error loading ${level}: ${e.message}`);
    }
  });
}
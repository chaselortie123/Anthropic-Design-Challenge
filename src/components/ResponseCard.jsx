import { marked } from 'marked';

export default function ResponseCard({ content, hasSubmitted, mode, level }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    return { __html: marked(text) };
  };

  const getOnboardingContent = () => {
    const levelName = level === 'do' ? 'PROCEDURE' : level === 'get' ? 'INTUITION' : 'PRINCIPLE';
    const levelColor = level === 'do' ? '#22c55e' : level === 'get' ? '#eab308' : '#a855f7';
    const levelEmoji = level === 'do' ? '🟢' : level === 'get' ? '🟡' : '🟣';
    
    if (mode === 'visual') {
      const visualContent = {
        do: `┌─────────────────┐
│   PROCEDURE     │  ← You are here!
│                 │
│ 1. Clear steps  │
│ 2. Actionable   │
│ 3. Execute now  │
└─────────────────┘
        ▼
   [Take action]`,
        
        get: `Concept ═══════════ Familiar Thing
   │                      │
   │    Structure         │
   │       ═══════════════│═══ Pattern
   │                      │
   └─ Mental Model ──────┘
   
This is like a bridge connecting
new ideas to what you know.`,

        know: `    Universal Pattern
         ╭─────╮
    Input│     │Output
    ─────│  ⚡  │─────▶
         │     │
         ╰─────╯
           │
      Applies to:
      • Physics
      • Psychology  
      • Business`
      };
      
      return (
        <div className="response-placeholder">
          <div style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
            {levelEmoji} {levelName} Mode Demo
          </div>
          <div className="response-visual" style={{ marginBottom: '1rem' }}>
            {visualContent[level]}
          </div>
          <div style={{ fontStyle: 'italic', opacity: '0.8' }}>Try dragging the slider above to see different levels!</div>
        </div>
      );
    }

    const textContent = {
      do: {
        title: "🟢 PROCEDURE - How to get started",
        content: [
          "**1. Ask any question** in the input below",
          "**2. Watch responses appear** for all three levels",
          "**3. Drag the slider** to explore different depths",
          "**4. Toggle 📖/👁️** for text or visual modes"
        ]
      },
      get: {
        title: "🟡 INTUITION - Think of it like this",
        content: [
          "Extended Learning is like **having three different tutors**:",
          "• One gives you **step-by-step instructions**",
          "• One helps you **understand the why** through analogies", 
          "• One reveals **universal patterns** that apply everywhere"
        ]
      },
      know: {
        title: "🟣 PRINCIPLE - The deeper truth",
        content: [
          "**Core principle**: True understanding has layers",
          "• **Surface**: What to do",
          "• **Middle**: Why it works", 
          "• **Deep**: Universal patterns that transcend domains",
          "",
          "This mirrors how experts think - they see connections across different fields."
        ]
      }
    };

    const currentContent = textContent[level];
    
    return (
      <div className="response-placeholder">
        <div style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600', color: levelColor }}>
          {currentContent.title}
        </div>
        {currentContent.content.map((line, i) => (
          <div key={i} style={{ marginBottom: line === '' ? '0.5rem' : '0.25rem' }}>
            {line}
          </div>
        ))}
        <div style={{ fontStyle: 'italic', opacity: '0.8', marginTop: '1rem' }}>
          Try dragging the slider above or ask: "How do I learn faster?"
        </div>
      </div>
    );
  };

  return (
    <div className="response-card">
      {!hasSubmitted ? (
        getOnboardingContent()
      ) : !content ? (
        <div className="response-loading">Loading...</div>
      ) : mode === 'visual' ? (
        <div className="response-content response-visual">
          {content}
        </div>
      ) : (
        <div 
          className="response-content markdown-content" 
          dangerouslySetInnerHTML={renderMarkdown(content)}
        />
      )}
    </div>
  );
}
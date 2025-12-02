import { marked } from 'marked';

export default function ResponseCard({ content, hasSubmitted, mode }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    return { __html: marked(text) };
  };

  return (
    <div className="response-card">
      {!hasSubmitted ? (
        <div className="response-placeholder">
          <div style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>Welcome to Extended Learning!</div>
          <div style={{ marginBottom: '1rem' }}>Ask any question and explore three depth levels:</div>
          <div style={{ marginBottom: '0.5rem' }}>• <span style={{ color: '#22c55e' }}>🟢 PROCEDURE</span> - Clear steps to execute</div>
          <div style={{ marginBottom: '0.5rem' }}>• <span style={{ color: '#eab308' }}>🟡 INTUITION</span> - Mental models and analogies</div>
          <div style={{ marginBottom: '1rem' }}>• <span style={{ color: '#a855f7' }}>🟣 PRINCIPLE</span> - Universal patterns</div>
          <div style={{ marginBottom: '1rem', opacity: '0.7' }}>Toggle between 📖 text and 👁️ visual ASCII diagrams for each level.</div>
          <div style={{ fontStyle: 'italic', opacity: '0.8' }}>Try asking: "How do I learn faster?" or "What makes good design?"</div>
        </div>
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
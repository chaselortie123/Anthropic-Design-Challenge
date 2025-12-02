import { useState } from 'react';

// Icons (inline SVGs)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

const SlidersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="2" y1="4" x2="14" y2="4" /><line x1="2" y1="12" x2="14" y2="12" />
    <circle cx="5" cy="4" r="1.5" fill="currentColor" /><circle cx="11" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#60a5fa" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" /><polyline points="8,4 8,8 11,10" />
  </svg>
);

const ExtendedLearningIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" strokeWidth="1.5">
    <rect x="2" y="10" width="3" height="4" rx="0.5" fill={active ? "#22c55e" : "none"} stroke={active ? "#22c55e" : "currentColor"} />
    <rect x="6.5" y="6" width="3" height="8" rx="0.5" fill={active ? "#eab308" : "none"} stroke={active ? "#eab308" : "currentColor"} />
    <rect x="11" y="2" width="3" height="12" rx="0.5" fill={active ? "#a855f7" : "none"} stroke={active ? "#a855f7" : "currentColor"} />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
    <path d="M8 12 L8 4 M4 7 L8 3 L12 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 4.5 L6 7.5 L9 4.5" />
  </svg>
);

export default function ChatInput({ onSubmit, isExtendedLearning, onToggleExtendedLearning, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        className="chat-textarea"
        disabled={disabled}
      />

      <div className="chat-toolbar">
        
        {/* Left buttons */}
        <div className="toolbar-left">
          <button className="icon-button" disabled aria-label="Add">
            <PlusIcon />
          </button>
          <button className="icon-button" disabled aria-label="Settings">
            <SlidersIcon />
          </button>
          <button className="icon-button" disabled aria-label="Extended Thinking">
            <ClockIcon />
          </button>
          
          {/* Extended Learning - functional */}
          <button
            className={`icon-button ${isExtendedLearning ? 'active' : ''}`}
            onClick={onToggleExtendedLearning}
            aria-label="Extended Learning"
          >
            <ExtendedLearningIcon active={isExtendedLearning} />
          </button>
          
          <button className="icon-button" disabled aria-label="Clear">
            <TrashIcon />
          </button>
        </div>

        {/* Right side */}
        <div className="toolbar-right">
          <button className="model-button" disabled>
            Opus 4.5 <ChevronDown />
          </button>
          
          <button
            className="send-button"
            onClick={handleSubmit}
            disabled={disabled || !text.trim()}
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
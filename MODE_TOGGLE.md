# Mode Toggle: Text ↔ Visual

## What
A subtle toggle below the slider to switch between text and diagram responses. Uses refined SVG icons, not emojis.

## Icons

```jsx
const TextIcon = ({ active }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={active ? "#f4f4f5" : "#52525b"} strokeWidth="1.5">
    <path d="M2 3h10M2 7h7M2 11h9" strokeLinecap="round" />
  </svg>
);

const DiagramIcon = ({ active }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={active ? "#f4f4f5" : "#52525b"} strokeWidth="1.5">
    <rect x="1" y="1" width="4" height="4" rx="0.5" />
    <rect x="9" y="1" width="4" height="4" rx="0.5" />
    <rect x="5" y="9" width="4" height="4" rx="0.5" />
    <path d="M3 5v2.5a1 1 0 001 1h2.5M11 5v2.5a1 1 0 01-1 1h-2.5" />
  </svg>
);
```

## Component

Place directly below the DepthSlider:

```jsx
<Flex justify="center" mt={2}>
  <HStack 
    spacing={0} 
    bg="rgba(39,39,42,0.3)" 
    borderRadius="md" 
    p="2px"
  >
    <IconButton
      aria-label="Text mode"
      icon={<TextIcon active={mode === 'text'} />}
      onClick={() => setMode('text')}
      variant="ghost"
      size="xs"
      borderRadius="sm"
      bg={mode === 'text' ? 'rgba(255,255,255,0.1)' : 'transparent'}
      _hover={{ bg: 'rgba(255,255,255,0.05)' }}
    />
    <IconButton
      aria-label="Diagram mode"
      icon={<DiagramIcon active={mode === 'visual'} />}
      onClick={() => setMode('visual')}
      variant="ghost"
      size="xs"
      borderRadius="sm"
      bg={mode === 'visual' ? 'rgba(255,255,255,0.1)' : 'transparent'}
      _hover={{ bg: 'rgba(255,255,255,0.05)' }}
    />
  </HStack>
</Flex>
```

## State

Add to App.jsx:
```jsx
const [mode, setMode] = useState('text'); // 'text' or 'visual'
```

## API Changes

Update prompts to include visual mode. Fire 6 requests instead of 3:

```js
const PROMPTS = {
  'do-text': `Executable steps only. Numbered list. Maximum 5-7 steps. Extremely concise.`,
  
  'do-visual': `Create an ASCII diagram showing the sequence/timeline/flowchart.
Use box-drawing characters: ┌ ─ ┐ │ └ ┘ ▶ ▼ ───▶
Show steps as connected boxes. Labels inside boxes. Keep it clean.`,

  'get-text': `Explain through one strong analogy. Use **bold** for key terms. 2-3 paragraphs max.`,
  
  'get-visual': `Create an ASCII diagram mapping this concept to a familiar analogy.
Two columns: left = this concept, right = familiar equivalent.
Use ═══════ to connect parallel ideas. Show the structural similarity.`,

  'know-text': `The universal principle in 3-4 sentences. One core insight. **Bold** the key pattern.`,
  
  'know-visual': `Create an ASCII diagram showing the abstract pattern.
Minimal, conceptual. Show the universal loop/structure/relationship.
List 3-4 domains where this pattern appears.`,
};
```

## Response Structure

```js
const [responses, setResponses] = useState({
  'do-text': null, 'do-visual': null,
  'get-text': null, 'get-visual': null,
  'know-text': null, 'know-visual': null,
});

// Current response key
const levelKey = sliderValue < 0.33 ? 'do' : sliderValue < 0.66 ? 'get' : 'know';
const responseKey = `${levelKey}-${mode}`;
const content = responses[responseKey];
```

## Visual Mode Display

For visual responses, use monospace:

```jsx
<Text
  fontSize="xs"
  fontFamily="mono"
  whiteSpace="pre"
  color={colors.text}
  lineHeight="1.4"
>
  {content}
</Text>
```

## Summary

| Element | Style |
|---------|-------|
| Container | `bg="rgba(39,39,42,0.3)"` pill shape |
| Icons | 14x14 SVG, `#52525b` inactive, `#f4f4f5` active |
| Active state | `bg="rgba(255,255,255,0.1)"` |
| Hover | `bg="rgba(255,255,255,0.05)"` |
| Spacing | Flush buttons, 2px container padding |

import { useState } from 'react';
import ChatInput from './components/ChatInput';
import DepthSlider from './components/DepthSlider';
import ResponseCard from './components/ResponseCard';
import { fetchAllLevels } from './api/claude';

export default function App() {
  const [responses, setResponses] = useState({
    'do-text': null, 'do-visual': null,
    'get-text': null, 'get-visual': null,
    'know-text': null, 'know-visual': null,
  });
  const [sliderValue, setSliderValue] = useState(0.1);
  const [mode, setMode] = useState('text');
  const [isExtendedLearning, setIsExtendedLearning] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const level = sliderValue < 0.33 ? 'do' : sliderValue < 0.66 ? 'get' : 'know';
  const responseKey = `${level}-${mode}`;

  const handleSubmit = async (text) => {
    setHasSubmitted(true);
    setResponses({
      'do-text': null, 'do-visual': null,
      'get-text': null, 'get-visual': null,
      'know-text': null, 'know-visual': null,
    });
    setSliderValue(0.1);
    
    // Fire all 6 requests simultaneously for smart loading
    fetchAllLevels(text, (responseKey, content) => {
      setResponses(prev => ({ ...prev, [responseKey]: content }));
    });
  };

  return (
    <div className="app-container">
      <div className="main-stack">
        
        {/* Response */}
        <ResponseCard 
          content={responses[responseKey]} 
          hasSubmitted={hasSubmitted}
          mode={mode}
          level={level}
        />

        {/* Slider - always visible */}
        <DepthSlider 
          value={sliderValue} 
          onChange={setSliderValue}
          loadedLevels={{
            do: !!responses[`do-${mode}`],
            get: !!responses[`get-${mode}`],
            know: !!responses[`know-${mode}`],
          }}
          mode={mode}
          setMode={setMode}
        />

        {/* Input */}
        <ChatInput 
          onSubmit={handleSubmit}
          isExtendedLearning={isExtendedLearning}
          onToggleExtendedLearning={() => setIsExtendedLearning(!isExtendedLearning)}
          disabled={!responses[`do-${mode}`] && hasSubmitted}
        />

      </div>
    </div>
  );
}

import { useState } from 'react';
import ChatInput from './components/ChatInput';
import DepthSlider from './components/DepthSlider';
import ResponseCard from './components/ResponseCard';
import { fetchAllLevels } from './api/claude';

export default function App() {
  const [responses, setResponses] = useState({ do: null, get: null, know: null });
  const [sliderValue, setSliderValue] = useState(0);
  const [isExtendedLearning, setIsExtendedLearning] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const level = sliderValue < 0.33 ? 'do' : sliderValue < 0.66 ? 'get' : 'know';

  const handleSubmit = async (text) => {
    setHasSubmitted(true);
    setResponses({ do: null, get: null, know: null });
    setSliderValue(0);
    
    fetchAllLevels(text, (lvl, content) => {
      setResponses(prev => ({ ...prev, [lvl]: content }));
    });
  };

  return (
    <div className="app-container">
      <div className="main-stack">
        
        {/* Response */}
        <ResponseCard 
          content={responses[level]} 
          hasSubmitted={hasSubmitted}
        />

        {/* Slider - show after first response */}
        {hasSubmitted && (
          <DepthSlider 
            value={sliderValue} 
            onChange={setSliderValue}
            loadedLevels={{
              do: !!responses.do,
              get: !!responses.get,
              know: !!responses.know,
            }}
          />
        )}

        {/* Input */}
        <ChatInput 
          onSubmit={handleSubmit}
          isExtendedLearning={isExtendedLearning}
          onToggleExtendedLearning={() => setIsExtendedLearning(!isExtendedLearning)}
          disabled={!responses.do && hasSubmitted}
        />

      </div>
    </div>
  );
}

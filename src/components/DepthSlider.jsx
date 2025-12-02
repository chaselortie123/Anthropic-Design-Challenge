export default function DepthSlider({ value, onChange, loadedLevels }) {
  const level = value < 0.33 ? 0 : value < 0.66 ? 1 : 2;
  const levelKey = ['do', 'get', 'know'][level];
  const labels = ['PROCEDURE', 'INTUITION', 'PRINCIPLE'];
  const colors = ['#22c55e', '#eab308', '#a855f7'];
  const colorClass = ['color-do', 'color-get', 'color-know'][level];
  const bgClass = ['bg-do', 'bg-get', 'bg-know'][level];

  return (
    <div className="depth-slider-container">
      
      {/* Static labels above notches */}
      <div className="slider-labels-top">
        {labels.map((label, i) => (
          <div
            key={label}
            className={`slider-label-static ${level === i ? 'selected' : ''}`}
            style={{ 
              color: colors[i],
              fontSize: level === i ? '0.8rem' : '0.7rem',
              fontWeight: level === i ? '700' : '500',
              transform: level === i ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 200ms ease'
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Slider */}
      <div className="slider-wrapper">
        
        {/* Track */}
        <div className="slider-track" />
        
        {/* Fill */}
        <div 
          className={`slider-fill ${bgClass}`}
          style={{ width: `${value * 100}%` }}
        />

        {/* Position markers with loading state */}
        <div className="slider-markers">
          {['do', 'get', 'know'].map((lvl, i) => (
            <div
              key={lvl}
              className="slider-marker"
              style={{
                backgroundColor: level === i ? 'transparent' : loadedLevels[lvl] ? '#52525b' : '#2a2a2a'
              }}
            />
          ))}
        </div>

        {/* Knob */}
        <div
          className={`slider-knob ${bgClass}`}
          style={{ 
            left: `calc(${value * 100}% - 10px)`,
            boxShadow: `0 0 12px ${colors[level]}50`
          }}
        />

        {/* Range input */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="slider-input"
        />
      </div>

      {/* Axis labels */}
      <div className="slider-labels">
        <span>How</span>
        <span>Why</span>
      </div>
    </div>
  );
}
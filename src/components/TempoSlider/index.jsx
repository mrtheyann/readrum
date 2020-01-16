import React from 'react';

import './tempo-slider.css';

const TempoSlider = ({ tempo, onchange }) => (
  <div className="tempo-slider">
    <div className="tempo-slider__slider">
      <input
        type="range"
        min="20"
        max="260"
        value={tempo}
        onChange={onchange}
      />
    </div>
    <div className="tempo-slider__title">{tempo} BPM</div>
  </div>
);

export default TempoSlider;

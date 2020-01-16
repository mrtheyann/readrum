import React, { useState, useEffect } from 'react';
import { sequence, rackPlayers, getTransportPosition } from '../../core';
import { updateVolume, updatePitch} from '../../core';

import './drum-rack.css';

const VolumeSlider = ({ volume, onchange }) => (
  <div className="volume-slider">
    <div className="volume-slider__slider">
      <input
        type="range"
        min="-30"
        step="0.5"
        max="3"
        value={volume}
        onChange={onchange}
      />
    </div>
    <div className="volume-slider__title">{volume} Volume</div>
  </div>
);

const PitchSlider = ({ pitch, onchange }) => (
  <div className="pitch-slider">
    <div className="pitch-slider__slider">
      <input
        type="range"
        min="0.50"
        step="0.01"
        max="2"
        value={pitch}
        onChange={onchange}
      />
    </div>
    <div className="pitch-slider__title">{pitch} Pitch</div>
  </div>
);

// Single step
const Step = ({ setStep, name, cursor }) => {
  const [box, setBox] = useState(false);
  return (
    <div className="step">
      <label className="step__label">
        <input
          id="name"
          className="step__checkbox"
          type="checkbox"
          checked={box}
          name={name}
          onChange={e => {
            setBox(e.target.checked);
            setStep(e.target.checked);
          }}
        />
        <div className={`step__cover${cursor ? ' step__cover--cursor' : ''}`} />
      </label>
    </div>
  );
};

/*
 * Set state of step in steps array
 * pos: Number. Position of the step in the Array(16)
 * value: Boolean. True if there is a hit on this note.
 * steps: Array. Current sequence: [false, true, ...]
 * setSteps: Setter function.
 */

const setSingleStep = (pos, value, steps, setSteps) => {
  console.log(pos, value, steps);
  setSteps([...steps.slice(0, pos), value, ...steps.slice(pos + 1)]);
};

const DrumRack = ({ sound, remove }) => {
  const [currentVolume, setCurrentVolume] = useState(0);
  const [currentPitch, setCurrentPitch] = useState(1);
  const [seq, setSeq] = useState();
  const [steps, setSteps] = useState(new Array(16).fill(false));
  const [position, setPosition] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Callback for a transport position update loop (curr: every 16th)
  // https://tonejs.github.io/docs/13.8.25/Sequence
  const invokeCb = () => {
    setPosition(getTransportPosition());
  };

  // On mount, we add the sound to the core.
  useEffect(() => {
    if (!rackPlayers.has(sound.name)) {
      rackPlayers.add(sound.name, sound.url, () => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, []);

  // When mount, create a new empty sequence for the sample.
  useEffect(() => {
    const newSequence = sequence(sound, () => {
      invokeCb();
    }).start(0);

    setSeq(newSequence);
    return () => {
      // Destroy sequence on unmount
      newSequence.dispose();
    };
  }, []);

  // Set volume value to slider's value;
  useEffect(() => {
    updateVolume(sound, currentVolume);
    updatePitch(sound, currentPitch);
  }, []);

  return (
    <div className="drum-rack">
      <div className="drum-rack__title">
        <div>{sound.displayName.toUpperCase()}</div>
        <div>
          <button
            className="drum-rack__remove"
            type="button"
            onClick={() => remove(sound.name)}
          >
            ×
          </button>
        </div>
      </div>
      {!loaded && (
        <div className="drum-rack__preloader-container">
          <h3> Loading </h3>
        </div>
      )}
      {loaded &&
        steps.map((step, index) => (
          <Step
            name={index + 1}
            key={index}
            setStep={value => {
              setSingleStep(index, value, steps, setSteps);
              seq.at(index, { notes: value === true ? [1] : [] });
            }}
            cursor={position === index}
          />
        ))}
        <div className="drum-rack__controls">
          <VolumeSlider 
                volume={currentVolume}
                onchange={e => {
                  setCurrentVolume(e.target.value);
                  updateVolume(sound, e.target.value);
                }}
              />
          <PitchSlider 
                pitch={currentPitch}
                onchange={e => {
                  setCurrentPitch(e.target.value);
                  updatePitch(sound, e.target.value);
                }}
              />
        </div>
    </div>
  );
};

export default DrumRack;
